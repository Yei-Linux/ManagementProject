import React, { Fragment } from "react";
import PropTypes from "prop-types";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import './bar.css';
TopBar.propTypes = {};

function TopBar({ logout, parentCallBack, open, classes }) {

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    > 
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={parentCallBack}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <div className = "customDiv">
          <Typography variant="h6" noWrap className = {classes.text}>
            Hello Jesus
          </Typography>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick = {logout}>
            <MeetingRoomIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
