export const parseFormatDate = (date) =>{
    let mydate = new Date(date);
    let month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
    return month + ' ' + mydate.getUTCDay() + ','+ mydate.getFullYear();
}