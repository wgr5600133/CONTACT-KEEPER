import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACT,
  CLEAR_CONTACT,
} from "../types";

function ContactState(props) {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACT });
  };
  const getContact = async () => {
    try {
      const res = await axios.get("/api/contact");
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  //Add contact
  const addContact = async (contact) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/contact", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  //Delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/api/contact/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  //Set current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  //Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //Update contact
  const updateContact = async (contact) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/contact/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (e) {
      dispatch({ type: CONTACT_ERROR, payload: e.response.msg });
    }
  };
  //Filter contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };
  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContact,
        clearContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
}

export default ContactState;
