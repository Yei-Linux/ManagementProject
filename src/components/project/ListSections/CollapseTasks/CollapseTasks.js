import React, { useContext, Fragment } from "react";
import { collapTaskseStyles } from "./CollapseTasksStyle";
import Collapse from "@material-ui/core/Collapse";

import contextTask from "../../../../context/task/taskContext";
import contextDrawer from "../../../../context/drawer/drawerContext";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

import Typography from "@material-ui/core/Typography";

function CollapseTasks({ section }) {
  const classes = collapTaskseStyles();

  const {
    taskList,
    setTasksList,
    projectByTasks,
    changeTaskSelected
  } = useContext(contextTask);

  const {isOpen,clickOnDrawer} = useContext(contextDrawer);

  return (
    <Collapse
      in={section.selected}
      timeout="auto"
      unmountOnExit
      className={classes.collapse}
    >
      <Fragment>
        <List className={classes.root}>
          {taskList &&
            taskList.map((task, index) => (
              <Fragment>
                <ListItem button key={task._id} className={classes.listItem} onClick={clickOnDrawer}>
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
                    variant="dot"
                    className={classes.badge}
                  >
                    <Avatar alt="Cindy Baker" src="/img/comment.png" />
                  </Badge>
                </ListItem>
              </Fragment>
            ))}
        </List>
      </Fragment>
    </Collapse>
  );
}

export default CollapseTasks;
