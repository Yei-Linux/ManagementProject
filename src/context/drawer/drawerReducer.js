import { IS_OPEN_DRAWER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case IS_OPEN_DRAWER:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};
