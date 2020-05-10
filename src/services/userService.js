import axiosClient from '../config/axios';

export const signUpUser = async (data) => {
    let response =  await axiosClient.post(`/users`,data);
    return response;
}