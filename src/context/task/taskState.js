import React, { useReducer } from 'react';
import contextTask from './taskContext';
import reducerTask from './taskReducer'

import { GET_TASK_LIST } from '../types';

function TaskState(props) {
    const initialState = {
        taskList: []
    }

    const [state,dispatch] = useReducer(reducerTask,initialState);

    const getTasksList = tasksList =>{
        dispatch({
            type: GET_TASK_LIST,
            payload: tasksList
        });
    }

    return (
        <contextTask.Provider
            value={{
                taskList: state.taskList,
                getTasksList
            }}
        >
            {props.children}
        </contextTask.Provider>
    );
}

export default TaskState