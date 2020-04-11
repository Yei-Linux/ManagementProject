import React, { useReducer } from 'react';
import contextProject from './projectContext';
import reducerProject from './projectReducer'

import { NEW_PROJECT_FORM,SET_PROJECT_LIST } from '../types';

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

    const setListProjects = projectList =>{
        dispatch({
            type: SET_PROJECT_LIST,
            payload: projectList
        });
    }

    return (
        <contextProject.Provider
            value={{
                projectList: state.projectList,
                isNewProject: state.isNewProject,
                showNewProjectForm,
                setListProjects
            }}
        >
            {props.children}
        </contextProject.Provider>
    );
}

export default ProjectState

