import React, { Fragment, useContext, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { commentsStyle } from "./CommentsStyle";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import contextSocket from '../../../../../../context/socket/socketContext';
import contextTask from '../../../../../../context/task/taskContext';
import { getProjectWithTasks } from "../../../../../../services/projectService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CommmentsByTask({ taskId }) {
  const classes = commentsStyle();

  const { projectByTasks,setTasksList } = useContext(contextTask);
  const { socket,comments,setComments,addComment} = useContext(contextSocket);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const sendMessageToTask = () => {
    let comment = document.getElementById('commentId').value;
    if(comment == ''){
      handleClick();
      return;
    }
    document.getElementById('commentId').value = '';
    socket.emit('SEND_COMMENTS',{
      commentData: {
        task: taskId,
        comment: comment
      },
      projectId: projectByTasks['_id']
    });
  }

  socket.off('COMMENTS_OF_TASK').on('COMMENTS_OF_TASK',(data) => {
    console.log(data['comment']);
    addCommentsToState(data['comment']);
  });

  socket.off('TASKS_BY_PROJECT').on('TASKS_BY_PROJECT',(data) => {
    console.log(data);
    loadTasksByProject(data['tasks'][0]['tasksList']);
  });

  const addCommentsToState = comment => {
    addComment(comment);
  }

  const addingFieldToTaskList = taskList => {
    taskList.forEach(task => {task["selected"] = false});
    return taskList;
  };

  const loadTasksByProject = async tasks => {
    setTasksList(addingFieldToTaskList(tasks));
  };

  return (
    <Fragment>
      <List className={classes.root}>
        {comments &&
          comments.map((comment, index) => (
            <Fragment>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/img/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.comment}
                  secondary={
                    <Fragment>
                      <Typography component="span" variant="body2">
                        {new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
      </List>

      <TextField
        className={classes.textArea}
        label="Comment for this Task"
        multiline
        rows={4}
        placeholder="Write a comment..."
        variant="outlined"
        id="commentId"
      />
      <div className={classes.divButton}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick = {sendMessageToTask}
        >
          Save
        </Button>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Comment musnt be empty
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

export default CommmentsByTask;
