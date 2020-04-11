import { NEW_PROJECT_FORM,SET_PROJECT_LIST } from "../types";

export default (state, action) => {
  switch (action.type) {
    case NEW_PROJECT_FORM:
      return {
        ...state,
        isNewProject: action.payload
      };
    case SET_PROJECT_LIST:
      return {
        ...state,
        projectList: action.payload
      };
    default:
      return state;
  }
};
