import React, { Fragment } from "react";
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

function CommmentsByTask({ comments }) {
  const classes = commentsStyle();

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
        id="outlined-multiline-static"
        label="Comment for this Task"
        multiline
        rows={4}
        placeholder="Write a comment..."
        variant="outlined"
      />
      <div className={classes.divButton}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </Fragment>
  );
}

export default CommmentsByTask;
