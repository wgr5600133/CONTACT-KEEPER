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

export default (state, actions) => {
  switch (actions.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [actions.payload, ...state.contacts],
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== actions.payload
        ),
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === actions.payload._id ? actions.payload : contact
        ),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: actions.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${actions.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        contacts: null,
        loading: false,
        filtered: null,
        current: null,
        error: null,
      };
    case CLEAR_FILTER:
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: actions.payload,
      };
    case GET_CONTACT:
      return {
        ...state,
        contacts: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
};
