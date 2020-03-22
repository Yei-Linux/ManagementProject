import React, { Fragment } from "react";
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

ListTask.propTypes = {};

function ListTask(props) {
  const classes = taskListStyles();

  return (
    <Fragment>
      <Typography variant="h6" noWrap className={classes.text}>
        Spring Project
      </Typography>

      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Select hosting" secondary="Jan 9, 2014" />
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

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Configure DB" secondary="Jan 7, 2014" />
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

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Deploy App" secondary="July 20, 2014" />
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
