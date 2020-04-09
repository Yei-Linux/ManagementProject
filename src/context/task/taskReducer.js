import { GET_TASK_LIST } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
      return {
        ...state,
        taskList: action.payload
      };
    default:
      return state;
  }
};
