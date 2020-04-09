import React, { useReducer } from 'react';
import contextProject from './projectContext';
import reducerProject from './projectReducer'

import { NEW_PROJECT_FORM,GET_PROJECT_LIST,ADD_PROJECT_TO_PROJECT_LIST } from '../types';

function ProjectState(props) {
    const initialState = {
        projectList: [],
        isNewProject  : false
    }

    const [state,dispatch] = useReducer(reducerProject,initialState);

    const showNewProjectForm = isVisible =>{
        dispatch({
            type: NEW_PROJECT_FORM,
            payload: isVisible
        });
    }

    const getListProjects = projectList =>{
        dispatch({
            type: GET_PROJECT_LIST,
            payload: projectList
        });
    }

    return (
        <contextProject.Provider
            value={{
                projectList: state.projectList,
                isNewProject: state.isNewProject,
                showNewProjectForm,
                getListProjects
            }}
        >
            {props.children}
        </contextProject.Provider>
    );
}

export default ProjectState

