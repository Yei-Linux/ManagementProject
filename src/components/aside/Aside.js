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

import { CssTextField } from "./AsideMaterialStyle";
import { Formik } from 'formik';

import contextProject from '../../context/project/projectContext';

const projectsStaticList = ["Spring Project", "Laravel Ecommerce", "Angular App"];

function Aside({ parentCallBack, open, classes }) {
  const theme = useTheme();

  const { isNewProject, projectList, showNewProjectForm, getListProjects } = useContext(contextProject);

  useEffect(()=>{
    getListProjects(projectsStaticList);
  },[]);

  const addingProject = ({project}) => {
    console.log('Adding project in backend ' + project);
    showNewProjectForm(false);
  }

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
          Tasks
        </Typography>
        <IconButton onClick={parentCallBack}>
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
        startIcon={<Icon color="primary">add_circle</Icon>}
      >
        New Project
      </Button>

      {
        isNewProject && 
        <Formik initialValues = {{project : ''}} onSubmit={data=>{
          addingProject(data);
        }}>
          {({values,handleChange,handleBlur,handleSubmit})=>(
            <form onSubmit = {handleSubmit}>
                <CssTextField
                className={classes.margin}
                label="Project Name"
                variant="outlined"
                name="project"
                value={values.project}
                onChange={handleChange}
                onBlur={handleBlur}
                />
                <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                type="submit"
              >
                Add Project
              </Button>
            </form>
          )}
        </Formik>
      }
      
      <Divider />

      <Typography variant="h6" noWrap className={classes.text}>
        Projects
      </Typography>
      <List>
        {projectList.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

    </Drawer>
  );
}

export default Aside;
