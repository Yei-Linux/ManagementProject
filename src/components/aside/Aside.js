import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import TextField from '@material-ui/core/TextField';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import { Formik } from "formik";

import contextProject from "../../context/project/projectContext";
import contextTask from "../../context/task/taskContext";
import {
  getProjects,
  addProject,
  getProjectWithTasks
} from "../../services/projectService";

function Aside({ parentCallBack, open, classes }) {
  const theme = useTheme();

  const {
    isNewProject,
    projectList,
    showNewProjectForm,
    setListProjects
  } = useContext(contextProject);
  const { setTasksList, setProjectByTasks } = useContext(contextTask);

  useEffect(() => {
    loadProjects(); 
  }, []);

  const loadProjects = async () => {
    let projectsResponse = await getProjects();
    setListProjects(projectsResponse.projects);
  };

  const addingProject = async data => {
    await addProject(data);
    await loadProjects();
    await showNewProjectForm(false);
  };

  const addingFieldToTaskList = taskList => {
    taskList.forEach(task => {task["selected"] = false});
    return taskList;
  };

  const loadTasksByProject = async project => {
    let tasksResponse = await getProjectWithTasks(project._id);
    setTasksList(addingFieldToTaskList(tasksResponse.data.projectWithTasks[0].tasksList));
    let projectResponse = tasksResponse.data.projectWithTasks[0];
    setProjectByTasks({"_id": projectResponse._id, "name": projectResponse.name, "user": projectResponse.user, "tasks": projectResponse.taskList});
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h6" noWrap className={classes.text}>
          Yei Linux
        </Typography>
        <IconButton onClick={parentCallBack} className={classes.icon}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>

      <Divider />

      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => showNewProjectForm(true)}
        startIcon={<Icon className={classes.iconAdd}>add_circle</Icon>}
      >
        New Project
      </Button>

      {isNewProject && (
        <Formik
          initialValues={{ name: "" }}
          onSubmit={data => {
            addingProject(data);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                className={classes.margin}
                label="Project Name"
                variant="filled"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  className: classes.input,disableUnderline: true
                }}
              />
              <Button
                className={classes.buttonAddProject}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Add Project
              </Button>
            </form>
          )}
        </Formik>
      )}

      <Divider />

      <List>
        {projectList.map((project, index) => (
          <ListItem
            button
            key={project._id}
            onClick={event => loadTasksByProject(project)}
          >
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={
              <Typography className={classes.textSecondary}>
                  {project.name}
              </Typography>}/>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Aside;
