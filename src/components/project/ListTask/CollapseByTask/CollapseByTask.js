import React, { useContext } from "react";

import "date-fns";
import { collapseStyles } from "./CollapseByTaskMatStyle";
import Collapse from "@material-ui/core/Collapse";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Formik } from "formik";
import Icon from "@material-ui/core/Icon";
import FormControl from "@material-ui/core/FormControl";


import { getProjectWithTasks } from "../../../../services/projectService";
import { updateTask } from '../../../../services/taskService';
import contextTask from "../../../../context/task/taskContext";

function CollapseByTask({ task }) {
  const classes = collapseStyles();

  const { setTasksList } = useContext(contextTask);

  const udpateTaskDetails = data => {
    updateTask({...task,initializedAt: data.initializedAt, finishedAt: data.finishedAt, daysToFinish: data.daysToFinish},task._id).then( response => {
        getProjectWithTasks(task.project).then(tasksResponse => {
            setTasksList(tasksResponse.data.projectWithTasks.tasks);
        });
    });
  };

  const addingDays = (event) =>{
    let initDate = new Date(task.initializedAt);
    initDate.setDate(initDate.getDate() + Number(event.target.value));

    return initDate;
  }

  return (
    <Collapse in={task.selected} timeout="auto" unmountOnExit className={classes.collapse}>
      <Card className={classes.root}>
        <CardContent>
          <Formik
            initialValues={{
              initializedAt: task.initializedAt,
              finishedAt: task.finishedAt,
              daysToFinish: task.daysToFinish
            }}
            onSubmit={data => {
              udpateTaskDetails(data);
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
              <form onSubmit = {handleSubmit} onChange = { (event) =>  {
                  let dateModified = addingDays ( event );
                  setFieldValue('finishedAt',new Date(dateModified).toISOString());
               }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.formControl}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Init Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    name="initializedAt"
                    value={values.initializedAt}
                    onChange={ e => {
                        setFieldValue('initializedAt',new Date(e).toISOString())
                    }}
                    onBlur={handleBlur}
                  />
                  <KeyboardDatePicker
                    className={classes.formControl}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Finished Date"
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                    name="finishedAt"
                    value={values.finishedAt}
                    disabled={true}
                    onChange={ e => {
                        setFieldValue('finishedAt',new Date(e).toISOString())
                    }}
                    onBlur={handleBlur}
                  />
                </MuiPickersUtilsProvider>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="filled-name"
                    type="number"
                    label="Days To Finish"
                    variant="filled"
                    name="daysToFinish"
                    value={values.daysToFinish}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.buttonSubmit}
                  startIcon={<Icon color="primary">add_circle</Icon>}
                  type="submit"
                >
                  Update Task Details
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Collapse>
  );
}

export default CollapseByTask;
