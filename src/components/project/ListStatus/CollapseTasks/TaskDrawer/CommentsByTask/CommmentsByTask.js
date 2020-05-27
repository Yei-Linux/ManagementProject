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
import { getProjectWithTasks, getProjectWithAlienTasks } from "../../../../../../services/projectService";

import { getFirstLetterOfUser } from "../../../../../../helpers/DataHelper";
import { isProjectCreatedByMe } from "../../../../../../helpers/AuthHelper";

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
        comment: comment,
        user: localStorage.getItem('user_id')
      },
      projectId: projectByTasks['_id']
    });
  }

  socket.off('COMMENTS_OF_TASK').on('COMMENTS_OF_TASK',(data) => {
    console.log(data['comment']);
    addCommentsToState(data['comment']);
    let me = isProjectCreatedByMe(projectByTasks['user']);
    me ? loadTasksByProject(projectByTasks['_id']) : loadAlienTasksByProject(projectByTasks['_id']); 
  }); 

  const addCommentsToState = comment => {
    addComment(comment);
  }

  const addingFieldToTaskList = taskList => {
    taskList.forEach(task => {task["selected"] = false;task['me'] = true;});
    return taskList;
  };

  const filteredAlienTask = invitedTasks => {
    let newAlienTask = invitedTasks.map( alienTask =>{
      alienTask.task['me'] = alienTask.me;
      alienTask.task['numberComments'] = alienTask.numberComments;
      alienTask.task['selected'] = false;
      return { ...alienTask.task };
    });
    return newAlienTask;
  }

  const loadAlienTasksByProject = async projectId => {
    let tasksResponse = await getProjectWithAlienTasks(projectId);
    setTasksList(filteredAlienTask(tasksResponse.data.invitedTasks));
  };

  const loadTasksByProject = async projectId => {
    let tasksResponse = await getProjectWithTasks(projectId);
    setTasksList(addingFieldToTaskList(tasksResponse.data.projectWithTasks[0].tasksList));
  };

  return (
    <Fragment>
      <List className={classes.root}>
        {comments &&
          comments.map((comment, index) => (
            <Fragment>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp">{getFirstLetterOfUser(comment['user']['name'])}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={comment.comment}
                  secondary={
                    <Fragment>
                      <Typography component="span" variant="body2">
                        {comment['user']['name']} - {new Date(comment.createdAt).toLocaleString()}
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
