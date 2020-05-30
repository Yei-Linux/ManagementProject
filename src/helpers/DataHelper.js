import { getDynamicFiedls } from "../constant/dynamicFields";

export const getFirstLetterOfUser = user => {
    return user.substring(0,2).toUpperCase();
}

export const replaceValuesInTemplate = (template,userObject) => {
    getDynamicFiedls().map( dynamicField => {
        let rgx = new RegExp(`{{${dynamicField}}}`);
        template = template.replace(rgx,userObject[dynamicField]);
    });
    return template;
}