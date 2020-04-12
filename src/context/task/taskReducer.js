import { SET_TASK_LIST, SET_PROJECT_BY_TASKS, CHANGE_TASK_SELECTED } from "../types";

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
    case CHANGE_TASK_SELECTED:
      return {
        ...state,
        taskList: state.taskList.map(task => task._id == action.payload ? {...task,selected: !task.selected} : task)
      }
    default:
      return state;
  }
};
