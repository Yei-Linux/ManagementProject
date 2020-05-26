import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

import { useHomeStyles } from "./HomeMaterialStyle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import Aside from "../../components/aside/Aside";
import TopBar from "../../components/bar/TopBar";
import Project from "../../components/project/Project";

import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import CssBaseline from "@material-ui/core/CssBaseline";

function ManagmentHome(props) {
  const classes = useHomeStyles();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [open, setOpen] = React.useState(false);
  const [openSwipeableDrawer, setOpenSwipeableDrawer] = React.useState(false);
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenSwipeableDrawer = () => {
    setOpenSwipeableDrawer(true);
  }

  const handleCloseSwipeableDrawer = () => {
    setOpenSwipeableDrawer(false);
  }

  const handleWichDrawerOpen = () => {
    width > 768 ? handleDrawerOpen() : handleOpenSwipeableDrawer();
  }

  const history = useHistory();
  const logOut = () => {
    localStorage.clear("user_info");
    localStorage.clear("user_id");
    history.push("/");
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    width > 768 ? handleCloseSwipeableDrawer() : handleDrawerClose();
  }

  const isMobileView = () => {
    return width > 768 ? false : true;
  }

  return (
    <div className={classes.root}>
      {
        !isMobileView() ?
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
        >
          <Aside parentCallBack={handleDrawerClose} classes={classes} />
        </Drawer>
        :
        <SwipeableDrawer
          anchor="left"
          open={openSwipeableDrawer}
          onClose={handleOpenSwipeableDrawer}
          onOpen={handleCloseSwipeableDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Aside parentCallBack={handleCloseSwipeableDrawer} classes={classes} />
        </SwipeableDrawer>
      }
      
      <TopBar
        logout={logOut}
        parentCallBack={handleWichDrawerOpen}
        open={open}
        classes={classes}
      />
      <Project open={open} classes={classes} />
    </div>
  );
}

export default ManagmentHome;

ManagmentHome.propTypes = {}; 
