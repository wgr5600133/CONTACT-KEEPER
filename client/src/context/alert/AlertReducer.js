import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state, actions) => {
  switch (actions.type) {
    case SET_ALERT:
      return [...state, actions.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== actions.payload);
    default:
      return state;
  }
};
