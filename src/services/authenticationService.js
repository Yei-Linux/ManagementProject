import axiosClient from '../config/axios';

export const authenticateUser = async (data) => {
    let response =  await axiosClient.post(`/auth`,data);
    return response;
}