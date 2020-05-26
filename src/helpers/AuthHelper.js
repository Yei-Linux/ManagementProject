export const haveToken = () => {
    if(localStorage.getItem("user_info")){
        return true;
    }
    return false;
}

export const saveAuthInfo = (token) =>{
    localStorage.setItem('user_info',token);
}

export const isProjectCreatedByMe = (projectUserId) => {
    return localStorage.getItem('user_id') == projectUserId ? true : false;
}
