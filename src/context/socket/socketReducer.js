import { SAVING_SOCKET, SET_COMMENTS } from "../types";

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
    default:
      return state;
  }
};
