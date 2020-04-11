import { SET_TASK_LIST, SET_PROJECT_BY_TASKS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_TASK_LIST:
      return {
        ...state,
        taskList: action.payload
      };
    case SET_PROJECT_BY_TASKS:
      return {
        ...state,
        projectByTasks: action.payload
      };
    default:
      return state;
  }
};
