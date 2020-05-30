import React from 'react';
import axiosNotificationClient from '../config/axiosNotification';

export const sendEmailNotification = async (request) => {
    return await axiosNotificationClient.post("/email/send",request);
}