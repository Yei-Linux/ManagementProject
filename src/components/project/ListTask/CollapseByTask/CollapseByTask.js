import React from "react";
import { collapseStyles } from './CollapseByTaskMatStyle';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from '@material-ui/icons/StarBorder';

function CollapseByTask() {
  const classes = collapseStyles();

  return (
    <Collapse in={true} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
      </List>
    </Collapse>
  );
}

export default CollapseByTask;
