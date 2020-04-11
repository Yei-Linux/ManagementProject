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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { parseFormatDate } from "../../../helpers/DateHelper";

ListTask.propTypes = {};

function ListTask(props) {
  const classes = taskListStyles();

  const { taskList, projectByTasks } = useContext(contextTask);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Typography variant="h6" noWrap className={classes.text}>
        {projectByTasks && projectByTasks.name}
      </Typography>

      <List className={classes.root}>
        {taskList &&
          taskList.map((task,index) => (
            <Fragment>
              <ListItem key={task._id}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={task.name}
                  secondary={parseFormatDate(task.createAt)}
                />
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
                {true ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <CollapseByTask/>
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
