import React from "react";
import PropTypes from "prop-types";
import { addTaskStyles } from "./AddTaskMatStyle";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

AddTask.propTypes = {};

function AddTask(props) {
  const classes = addTaskStyles();

  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
        <FormControl className={clsx(classes.formControl)}>
          <TextField
            label="Task..."
            className={clsx(classes.input)}
            id="margin-normal"
            helperText="Think and add your task"
            margin="normal"
          />
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonSubmit}
          startIcon={<Icon color="primary">add_circle</Icon>}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default AddTask;
