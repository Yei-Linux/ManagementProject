import { SAVING_SOCKET, SET_COMMENTS, ADD_COMMENT } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SAVING_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case ADD_COMMENT: 
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
    default:
      return state;
  }
};
