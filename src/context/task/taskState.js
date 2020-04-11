import React, { useReducer } from 'react';
import contextTask from './taskContext';
import reducerTask from './taskReducer'

import { SET_TASK_LIST,SET_PROJECT_BY_TASKS } from '../types';

function TaskState(props) {
    const initialState = {
        taskList: [],
        projectByTasks : null,
    }

    const [state,dispatch] = useReducer(reducerTask,initialState);

    const setTasksList = tasksList =>{
        dispatch({
            type: SET_TASK_LIST,
            payload: tasksList
        });
    }

    const setProjectByTasks = project => {
        dispatch({
            type: SET_PROJECT_BY_TASKS,
            payload: project
        });
    }

    return (
        <contextTask.Provider
            value={{
                taskList: state.taskList,
                projectByTasks: state.projectByTasks,
                setTasksList,
                setProjectByTasks
            }}
        >
            {props.children}
        </contextTask.Provider>
    );
}

export default TaskState