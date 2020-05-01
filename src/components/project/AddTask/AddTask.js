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
  const sections = [
    { id: "5eab3a6e6c3f964a8ccb0136", name: "To Do" },
    { id: "5eab3a786c3f964a8ccb0137", name: "Doing" },
    { id: "5eab3a7d6c3f964a8ccb0138", name: "Done" }
  ];

  const { setTasksList,setProjectByTasks,projectByTasks } = useContext(contextTask);

  const addingTaskByProject = async data =>{
    await addTask({name: data.name,status: sections[0].id,project: projectByTasks._id});
    await loadTasksByProject(projectByTasks._id);
  }

  const addingFieldToTaskList = taskList => {
    taskList.forEach(task => {task["selected"] = false});
    return taskList;
  };

  const loadTasksByProject = async projectId => {
    let tasksResponse = await getProjectWithTasks(projectId);
    setTasksList(addingFieldToTaskList(tasksResponse.data.projectWithTasks[0].tasksList));
    let projectResponse = tasksResponse.data.projectWithTasks[0];
    setProjectByTasks({"_id": projectResponse._id, "name": projectResponse.name, "user": projectResponse.user, "tasks": projectResponse.taskList});
  };

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
                  label="Write your task"
                  className={clsx(classes.input)}
                  id="margin-normal"
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
                startIcon={<Icon color="primary" className={classes.iconAdd}>add_circle</Icon>}
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
