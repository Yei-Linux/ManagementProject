import React from 'react';
import axiosClient from '../config/axios';

export const insertInvitedUserTask = async (request) => {
    return await axiosClient.post('/invitedUsers',request);
}   