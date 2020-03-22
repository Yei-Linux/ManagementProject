export const haveToken = () => {
    if(localStorage.getItem("user_info")){
        return true;
    }
    return false;
}

