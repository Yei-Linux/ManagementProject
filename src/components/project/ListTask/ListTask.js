import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

import { taskListStyles } from "./ListTaskMatStyle";
import contextTask from "../../../context/task/taskContext";
import CollapseByTask from "./CollapseByTask/CollapseByTask";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { parseFormatDate } from "../../../helpers/DateHelper";
import { deleteTask, updateTask } from "../../../services/taskService";
import { getProjectWithTasks } from "../../../services/projectService";

import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

import Swal from "sweetalert2";

ListTask.propTypes = {};

function ListTask(props) {
  const classes = taskListStyles();

  const {
    taskList,
    setTasksList,
    projectByTasks,
    changeTaskSelected
  } = useContext(contextTask);

  const handleCollapse = (taskId,taskStatus) => {
    taskStatus == 'RUNNING' && changeTaskSelected(taskId);
  };

  const deleteTaskOfProject = taskId => {
    Swal.fire({
      title: "Are you sure to delete this task?",
      text: "Please, thinking...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        deleteTask(taskId).then(response => {
          getProjectWithTasks(projectByTasks._id).then(tasksResponse => {
            setTasksList(tasksResponse.data.projectWithTasks.tasks);
          });
        });
      }
    });
  };

  const updateStatus = (task,status) =>{
    delete task['selected'];
    task['initializedAt'] = Date.now();
    updateTask({...task,status},task._id).then( response => {
      getProjectWithTasks(projectByTasks._id).then(tasksResponse => {
        setTasksList(tasksResponse.data.projectWithTasks.tasks);
      });
    });
  }

  const renderTextButton = (task) => {
    switch (task.status) {
      case "NOT-INIT":
        return (
          <Fragment>
            <Button variant="contained" color="primary" component="span" className={classes.buttonStatus} onClick={() => {updateStatus(task,'RUNNING')}}>
              Click to Init
            </Button>
            <Chip color="primary" deleteIcon={<DoneIcon />} avatar={<Avatar>I</Avatar>} label="Not init"/>
          </Fragment>
        );
      case "RUNNING":
          return (
            <Fragment>
              <Button variant="contained" color="primary" component="span" className={classes.buttonStatus}>
                Click To Finish
              </Button>
              <Chip color="primary" deleteIcon={<DoneIcon />} avatar={<Avatar>R</Avatar>} label="Running"/>
            </Fragment>
          );
      case "FINISHED":
        return (
          <Chip
            color="primary"
            deleteIcon={<DoneIcon />}
            avatar={<Avatar>F</Avatar>}
            label="Finished"
          />
        );
      default:
        break;
    }
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Typography variant="h6" noWrap className={classes.text}>
        {projectByTasks && projectByTasks.name}
      </Typography>

      <List className={classes.root}>
        {taskList &&
          taskList.map((task, index) => (
            <Fragment>
              <ListItem button key={task._id} className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${task.name}`}
                  onClick={event => handleCollapse(task._id,task.status)}
                  secondary={parseFormatDate(task.createAt)}
                  className={classes.listItemText}
                />
                {renderTextButton(task)}
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={event => deleteTaskOfProject(task._id)}
                >
                  Delete
                </Button>
                {task.selected ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <CollapseByTask task={task} />
            </Fragment>
          ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        className={classes.buttonDelete}
        startIcon={<DeleteIcon />}
      >
        Delete Project
      </Button>
    </Fragment>
  );
}

export default ListTask;
