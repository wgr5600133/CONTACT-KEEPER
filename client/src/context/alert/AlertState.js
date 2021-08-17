import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { v4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

import React, { useReducer } from "react";

function AlertState(props) {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type, timeout = 5000) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
