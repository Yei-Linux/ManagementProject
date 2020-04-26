import React, { Fragment } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import AddTask from "./AddTask/AddTask";
import ListSection from "./ListSections/ListSections";

function Project({ open, classes }) {
  return (
    <div className={classes.mainStyle}>
      <div
        className={clsx(classes.content,classes.content1, {
          [classes.contentShift]: open
        })}
      >
        <AddTask />
      </div>
      <div
        className={clsx(classes.content,classes.content2, {
          [classes.contentShift]: open
        })}
      >
        <ListSection />
      </div>
    </div>
  );
}

export default Project;

Project.propTypes = {};
