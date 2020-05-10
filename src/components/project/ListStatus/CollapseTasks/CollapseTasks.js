import React, { useContext, Fragment } from "react";
import { collapTaskseStyles } from "./CollapseTasksStyle";
import Collapse from "@material-ui/core/Collapse";

import contextTask from "../../../../context/task/taskContext";
import contextDrawer from "../../../../context/drawer/drawerContext";
import contextSocket from "../../../../context/socket/socketContext";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

import { getTaskById } from "../../../../services/taskService";

import Typography from "@material-ui/core/Typography";

import io from "socket.io-client";
const socketUrl = "http://localhost:4000";

function CollapseTasks({ section, parentTaskCallBack }) {
  const classes = collapTaskseStyles();

  const {
    taskList,
    setTasksList,
    projectByTasks,
    changeTaskSelected
  } = useContext(contextTask);

  const { socket, savingSocket, setComments } = useContext(contextSocket);
  const { isOpen, clickOnDrawer } = useContext(contextDrawer);

  const clickOnTask = async taskId => {
    initSocket();
    let taskSelected = await getTaskById(taskId);
    setComments(taskSelected.data.task[0].commentsList);
    parentTaskCallBack(taskSelected.data.task[0]);
    clickOnDrawer();
  };

  const initSocket = () => {
    const socket = io.connect(socketUrl);
    savingSocket(socket);
  };

  const isTaskListByStatusEmpty = () => {
    let taskListByStatus = taskList.filter(task => task.status == section.id);
    return taskListByStatus.length == 0 ? true : false;
  };

  return (
    <Collapse
      in={section.selected}
      timeout="auto"
      unmountOnExit
      className={classes.collapse}
    >
      <Fragment>
        {taskList && !isTaskListByStatusEmpty() ? (
          <List className={classes.root}>
            {taskList &&
              taskList.map((task, index) => (
                <Fragment key={task._id}>
                  {task.status == section.id && (
                    <ListItem
                      button
                      key={task._id}
                      className={classes.listItem}
                      onClick={event => clickOnTask(task._id)}
                    >
                      <ListItemAvatar>
                        <Avatar alt="Cindy Baker" src="/img/taskIcon.png" />
                      </ListItemAvatar>

                      <ListItemText
                        primary={`${task.name}`}
                        className={classes.listItemText}
                      />

                      <Typography className={classes.date}>
                        April 25,2020
                      </Typography>
                      <Badge
                        color="secondary"
                        badgeContent={task.numberComments}
                        className={classes.badge}
                      >
                        <Avatar alt="Cindy Baker" src="/img/comment.png" />
                      </Badge>
                    </ListItem>
                  )}
                </Fragment>
              ))}
          </List>
        ) : (
          <div className={classes.backgroundEmptyTask} >
            <div className={classes.emptyTask}></div>
          </div>
        )}
      </Fragment>
    </Collapse>
  );
}

export default CollapseTasks;
