import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useHomeStyles } from "./HomeMaterialStyle";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import Aside from "../../components/aside/Aside";
import TopBar from "../../components/bar/TopBar";
import Project from "../../components/project/Project";

import CssBaseline from "@material-ui/core/CssBaseline";

import contextSocket from '../../context/socket/socketContext';

import io from "socket.io-client";
const socketUrl = "http://localhost:4000";

function ManagmentHome(props) {
  const classes = useHomeStyles();
  const [open, setOpen] = React.useState(false);
  const { savingSocket } = useContext(contextSocket);

  useEffect(() => {
    initSocket();
  }, []);

  const initSocket = () => {
    const socket = io.connect(socketUrl);
    savingSocket(socket);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const logOut = () => {
    localStorage.clear("user_info");
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar
        logout={logOut}
        parentCallBack={handleDrawerOpen}
        open={open}
        classes={classes}
      />
      <Aside parentCallBack={handleDrawerClose} open={open} classes={classes} />
      <Project open={open} classes={classes} />
    </div>
  );
}

export default ManagmentHome;

ManagmentHome.propTypes = {};
