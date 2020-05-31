import React from 'react';
import axiosClient from '../config/axios';

export const getTaskById = async (taskId) => {
    return await axiosClient.get(`/tasks/${taskId}`);
}

export const addTask = async (task) =>{
    return await axiosClient.post(`/tasks`,task);
} 

export const updateTask = async (task,taskId) =>{
    return await axiosClient.put(`/tasks/${taskId}`,task);
}

export const deleteTask = async (taskId) =>{
    return await axiosClient.delete(`/tasks/${taskId}`);
}

export const updateLikeTask = async (taskId,request) => {
    return await axiosClient.put(`/tasks/${taskId}/like`,request);
}