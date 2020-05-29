import axiosClient from '../config/axios';

export const signUpUser = async (data) => {
    let response =  await axiosClient.post(`/users`,data);
    return response;
}

export const searchUsers = async (firstLettersUsers) => {
    return await axiosClient.get(`/users/search`,{params: {firstLetter: firstLettersUsers}});
}