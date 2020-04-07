import { NEW_PROJECT_FORM,GET_PROJECT_LIST } from "../types";

export default (state, action) => {
  switch (action.type) {
    case NEW_PROJECT_FORM:
      return {
        ...state,
        isNewProject: true
      };
    case GET_PROJECT_LIST:
      return {
        ...state,
        projectList: action.payload
      };
    default:
      return state;
  }
};
