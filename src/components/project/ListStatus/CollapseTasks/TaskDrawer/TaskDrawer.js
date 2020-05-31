import React, { useState, useContext, useEffect, Fragment } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import contextDrawer from "../../../../../context/drawer/drawerContext";
import contextTask from "../../../../../context/task/taskContext";
import contextSocket from "../../../../../context/socket/socketContext";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

import InputLabel from "@material-ui/core/InputLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import UpdateIcon from "@material-ui/icons/Update";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { drawerStyles } from "./TaskDrawerStyle";

import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CloseIcon from '@material-ui/icons/Close';

import Tooltip from '@material-ui/core/Tooltip';

import { updateTask, updateLikeTask } from "../../../../../services/taskService";
import { getProjectWithTasks } from "../../../../../services/projectService";
import { getFirstLetterOfUser } from "../../../../../helpers/DataHelper";
import { isProjectCreatedByMe } from "../../../../../helpers/AuthHelper";

import ModalDrawer from './ModalDrawer/ModalDrawer';
import CommmentsByTask from "./CommentsByTask/CommmentsByTask";
import * as yup from "yup";

import clsx from "clsx";
import { updateInvitedTaskLike } from "../../../../../services/invitedUserTaskService";
import { getUsersLikeByTask } from "../../../../../services/userService";

function TaskDrawer({ open, task, me }) {
  const classes = drawerStyles();
  const sections = [
    { id: "5eab3a6e6c3f964a8ccb0136", name: "To Do" },
    { id: "5eab3a786c3f964a8ccb0137", name: "Doing" },
    { id: "5eab3a7d6c3f964a8ccb0138", name: "Done" }
  ];

  const priorities = [
    { id: "5eab3af46c3f964a8ccb0139", name: "Low" },
    { id: "5eab3b26b14a583e60be17e4", name: "Medium" },
    { id: "5eab3b31b14a583e60be17e5", name: "High" }
  ];

  const { setTasksList, setProjectByTasks, projectByTasks } = useContext(
    contextTask
  );
  const { clickOnDrawer } = useContext(contextDrawer);
  const { socket,comments,setComments,addComment} = useContext(contextSocket);

  const [openSelect, setOpenSelect] = useState(false);
  const [openSelectPriority, setOpenSelectPriority] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [likeTask,setLikeTask] = useState(false);
  const [usersLikes,setUsersLikes] = useState([]);

  useEffect(()=>{
    if(open){
      async function getUsersLikes(){
        setLikeTask(task.likeTask);
        let usersOnLikes = await getUsersLikeByTask(task._id);
        setUsersLikes(usersOnLikes.data.usersFound);
      }
      getUsersLikes();
    } 
  },[open]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClose = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

  const handleClosePriority = () => {
    setOpenSelectPriority(false);
  };

  const handleOpenPriority = () => {
    setOpenSelectPriority(true);
  };

  const updateTaskOnSubmit = async data => {
    data =
      data.status == "5eab3a786c3f964a8ccb0137"
        ? addingInitializeDateAndDaysToFinish(data)
        : data;
    await updateTask(data, task._id);
    await loadTasksByProject(projectByTasks._id);
    clickOnDrawer();
  };

  const addingInitializeDateAndDaysToFinish = data => {
    data.initializedAt = new Date(Date.now());
    data.daysToFinish =
      data.finishedAt.getDate() - data.initializedAt.getDate();
    return data;
  };

  const addingFieldToTaskList = taskList => {
    taskList.forEach(task => {
      task["selected"] = false;
    });
    return taskList;
  };

  const loadTasksByProject = async projectId => {
    let tasksResponse = await getProjectWithTasks(projectId);
    setTasksList(
      addingFieldToTaskList(tasksResponse.data.projectWithTasks[0].tasksList)
    );
    let projectResponse = tasksResponse.data.projectWithTasks[0];
    setProjectByTasks({
      _id: projectResponse._id,
      name: projectResponse.name,
      user: projectResponse.user,
      tasks: projectResponse.taskList
    });
  };

  const getPriorityNameById = priorityId => {
    return priorities.filter(priority => priority.id == priorityId)[0].name;
  };

  const fomateDateTime = dateTime => {
    return dateTime.replace("T", " ").replace("Z", " ");
  };

  const validationSchema = yup.object().shape({
    status: yup
      .string()
      .required()
      .label("Status"),
    finishedAt: yup
      .string()
      .required()
      .label("Finished at"),
    priority: yup
      .string()
      .required()
      .label("priority"),
    description: yup
      .string()
      .required()
      .label("description")
  });

  const onUpdateLikeTask = async () => {
    let newLike = isProjectCreatedByMe(projectByTasks.user) ? await updateLikeTask(task._id,{likeTask: !likeTask}) : await updateInvitedTaskLike({task: task._id, likeTask: !likeTask})
    setLikeTask(newLike.data.userLikeUpdated.likeTask);

    socket.emit('SEND_TASK_ID_FOR_USER_LIKES',{
      task: task._id
    });
  };

  socket.off('USER_LIKES').on('USER_LIKES',(data) => {
    setUsersLikes(data['usersFound']);
  }); 

  return (
    <Fragment>
      {task && (
        <SwipeableDrawer
          anchor="right"
          open={open}
          onClose={clickOnDrawer}
          onOpen={open}
          className={classes.drawerStyle}
        >
          <Formik
            initialValues={{
              name: task.name,
              daysToFinish: task.daysToFinish,
              status: task.status,
              finishedAt: task.finishedAt
                ? new Date(task.finishedAt)
                : new Date(Date.now()),
              priority: task.priority ? task.priority : "",
              description: task.description ? task.description : ""
            }}
            onSubmit={data => {
              updateTaskOnSubmit(data);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Card className={classes.root}>
                  <CardHeader
                    action={
                      <Fragment>
                        <IconButton aria-label="settings" onClick={clickOnDrawer}>
                          <CloseIcon />
                        </IconButton>
                      </Fragment>
                    }
                    title={
                      <div className={classes.cardHeaderContent}>
                        <h5 onChange={handleChange}>{values.name}</h5>
                        {task.status != "5eab3a7d6c3f964a8ccb0138" && (
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openSelect}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            name="status"
                            value={values.status}
                            className={classes.selectStatus}
                            onChange={event => {
                              setFieldValue("status", event.target.value);
                            }}
                          >
                            {sections &&
                              sections.map(section => (
                                <MenuItem value={section.id} key={section.id}>
                                  {section.name}
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                      </div>
                    }
                    subheader={
                      values.daysToFinish > 0 && (
                        <span> Faltan {values.daysToFinish} dias </span>
                      )
                    }
                    className = {classes.cardHeader}
                  />

                  <Divider />

                  <CardContent className={classes.cardContent}>
                    <FormControl className={classes.formControl}>
                      <FormLabel className={classes.label} htmlFor="mi-campo">
                        Responsable
                      </FormLabel>
                      <AvatarGroup max={3} className={classes.input}>
                        { task.usersGroup && 
                          task.usersGroup.map((user,index) => (
                            <Tooltip title={user['user']['name']} arrow>
                              <Avatar alt="Remy Sharp">{getFirstLetterOfUser(user['user']['name'])}</Avatar>
                            </Tooltip>
                          ))
                        }
                      </AvatarGroup>
                      <Button variant="outlined" size="small" color="primary" onClick={handleOpenModal}>
                        Agregar
                      </Button>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <FormLabel className={classes.label} htmlFor="mi-campo">
                        Fecha de Entrega
                      </FormLabel>
                      {task.status == "5eab3a7d6c3f964a8ccb0138" ? (
                        <Input
                          className={classes.input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="datetime"
                          name="finishedAt"
                          value={fomateDateTime(task.finishedAt)}
                          readOnly={true}
                        />
                      ) : (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            className={classes.input}
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Finish Date of Task"
                            KeyboardButtonProps={{
                              "aria-label": "change date"
                            }}
                            onChange={event => {
                              if (event != "Invalid Date") {
                                setFieldValue("finishedAt", new Date(event));
                              }
                            }}
                            onBlur={handleBlur}
                            name="finishedAt"
                            value={values.finishedAt}
                          />
                          {errors.finishedAt && (
                            <div className={classes.errorMessage}>
                              {errors.finishedAt}
                            </div>
                          )}
                        </MuiPickersUtilsProvider>
                      )}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <FormLabel className={classes.label} htmlFor="mi-campo">
                        Prioridad
                      </FormLabel>
                      <div className={clsx(classes.input)}>
                        {task.status == "5eab3a7d6c3f964a8ccb0138" ? (
                          <Input
                            inputProps={{ "aria-label": "priority" }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="priority"
                            value={getPriorityNameById(task.priority)}
                            readOnly={true}
                          />
                        ) : (
                          <Select
                            className={clsx(classes.priorityClass)}
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={openSelectPriority}
                            onClose={handleClosePriority}
                            onOpen={handleOpenPriority}
                            name="priority"
                            value={values.priority}
                            onChange={event => {
                              setFieldValue("priority", event.target.value);
                            }}
                          >
                            {priorities &&
                              priorities.map(priorityItem => (
                                <MenuItem
                                  value={priorityItem.id}
                                  key={priorityItem.id}
                                >
                                  {priorityItem.name}
                                </MenuItem>
                              ))}
                          </Select>
                        )}
                        {errors.priority && (
                          <div className={classes.errorMessage}>
                            {errors.priority}
                          </div>
                        )}
                      </div>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <FormLabel className={classes.label} htmlFor="mi-campo">
                        Descripcion
                      </FormLabel>
                      <div className={classes.input}>
                      <TextField
                        className={classes.textField}
                        label="Write a description"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="description"
                        value={values.description}
                        readOnly={
                            task.status == "5eab3a7d6c3f964a8ccb0138"
                              ? true
                              : false
                        }
                      />
                      {errors.description && (
                          <div className={classes.errorMessage}>
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </CardContent>

                  <CardActions disableSpacing className={classes.cardFooter}>
                    <Tooltip title={
                      usersLikes.map( user => (
                        <p>{user.name}</p>
                      ))
                      } arrow>
                      <IconButton aria-label="add to favorites" onClick={onUpdateLikeTask}>
                        <FavoriteIcon className = { !likeTask ? classes.heardIcon : classes.heardIconActive}/>
                      </IconButton>
                    </Tooltip>
                    
                    <IconButton aria-label="share">
                      <ShareIcon className = {classes.shareIcon}/>
                    </IconButton>

                    {task.status != "5eab3a7d6c3f964a8ccb0138" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<UpdateIcon />}
                        type="submit"
                      >
                        Update Task
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </form>
            )}
          </Formik>

          <CommmentsByTask taskId={task._id} />
        </SwipeableDrawer>
      )}

      <ModalDrawer open={openModal}  parentCallBackClose={handleCloseModal} task={task}/>
    </Fragment>
  );
}

export default TaskDrawer;
