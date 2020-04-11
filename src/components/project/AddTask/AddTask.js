import React,{ useContext } from "react";
import PropTypes from "prop-types";
import { addTaskStyles } from "./AddTaskMatStyle";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";

import contextTask from '../../../context/task/taskContext';
import { Formik } from 'formik';

import { addTask } from '../../../services/taskService';
import { getProjectWithTasks } from '../../../services/projectService';

AddTask.propTypes = {};

function AddTask() {
  const classes = addTaskStyles();
  const { setTasksList,projectByTasks } = useContext(contextTask);

  const addingTaskByProject = data =>{
    addTask({name: data.name,project: projectByTasks._id}).then( response => {
      getProjectWithTasks(projectByTasks._id).then( tasksResponse => {
        setTasksList(tasksResponse.data.projectWithTasks.tasks);
      });
    });
  }

  return (
    <div>
        <Formik initialValues = {{name : ''}} onSubmit={(data,{resetForm})=>{
          addingTaskByProject(data);
          resetForm({});
        }}>
          {({values,handleChange,handleBlur,handleSubmit})=>(
            <form className={classes.form} onSubmit = {handleSubmit}>
              <FormControl className={clsx(classes.formControl)}>
                <TextField
                  label="Task..."
                  className={clsx(classes.input)}
                  id="margin-normal"
                  helperText="Think and add your task"
                  margin="normal"
                  name="name"
                  value={values.name}
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
                Add Task
              </Button>
            </form>
          )}
        </Formik>
    </div>
  );
}

export default AddTask;
