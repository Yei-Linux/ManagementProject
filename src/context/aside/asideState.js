import React, { useReducer } from 'react';
import contextAside from './asideContext';
import reducerProject from './asideReducer'

import { NEW_PROJECT_FORM,GET_PROJECT_LIST } from '../types';

function AsideState(props) {
    const initialState = {
        projectList: [],
        isNewProject  : false
    }

    const [state,dispatch] = useReducer(reducerProject,initialState);

    const showNewProjectForm = () =>{
        dispatch({
            type: NEW_PROJECT_FORM
        });
    }

    const getListProjects = projectList =>{
        dispatch({
            type: GET_PROJECT_LIST,
            payload: projectList
        });
    }

    return (
        <contextAside.Provider
            value={{
                projectList: state.projectList,
                isNewProject: state.isNewProject,
                showNewProjectForm,
                getListProjects
            }}
        >
            {props.children}
        </contextAside.Provider>
    );
}

export default AsideState

