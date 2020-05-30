import axios from 'axios';

const axiosNotificationClient = axios.create({
    baseURL: 'http://localhost:8082/notificationProvider'
});

export default axiosNotificationClient;