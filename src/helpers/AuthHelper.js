export const haveToken = () => {
    if(localStorage.getItem("user_info")){
        return true;
    }
    return false;
}

export const saveAuthInfo = (token) =>{
    localStorage.setItem('user_info',token);
}
