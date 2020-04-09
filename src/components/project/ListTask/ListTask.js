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
import contextTask from '../../../context/task/taskContext';

ListTask.propTypes = {};
const tasksListStatic = [{'id':1,'name':'Select Hosting to microservice','date':'Jan 9,2015'},
                   {'id':2,'name':'Configure DB','date':'Jan 11,2015'},
                   {'id':3,'name':'Deploy App','date':'Jan 20,2019'}];

function ListTask(props) {
  const classes = taskListStyles();

  const { taskList ,getTasksList } = useContext(contextTask);

  useEffect(()=>{
    getTasksList(tasksListStatic);
  },[]);

  return (
    <Fragment>
      <Typography variant="h6" noWrap className={classes.text}>
        Spring Project
      </Typography>

      <List className={classes.root}>
        {taskList.map((task) => (
            <ListItem key={task.id}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={task.name} secondary={task.date} />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
              >
                Edit
              </Button>
            </ListItem>
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
