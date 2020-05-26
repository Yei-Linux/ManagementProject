import React from 'react';
import axiosClient from '../config/axios';

export const getProjects = async () => {
    let response =  await axiosClient.get(`/projects`);
    return response.data;
}

export const getProjectWithTasks = async (projectId) =>{
    return await axiosClient.get(`/projects/${projectId}`);
}

export const deleteProject = async (projectId) =>{
    return await axiosClient.delete(`/projects/${projectId}`);
}

export const addProject = async (projectRequest) =>{
    return await axiosClient.post(`/projects`,projectRequest);
}

export const getProjectWithAlienTasks = async (project) => {
    return await axiosClient.get(`/invitedUsers/alienTasks`,{ params : {project}});
}