import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:4000/api'
});

axiosClient.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('user_info')}`
    return config;
},(error)=>{
    return Promise.reject(error);
});

export default axiosClient;