import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import AddTask from './AddTask/AddTask';
import ListTask from "./ListTask/ListTask";


function Project({ open , classes}) {
  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open
      })}
    >
      <AddTask />
      <ListTask />
    </main>
  );
}

export default Project;

Project.propTypes = {};
