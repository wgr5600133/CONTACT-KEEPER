import React, { useContext, useRef, useEffect } from "react";
import contactContext from "../../context/contact/contactContext";

function ContactFilter(props) {
  const ContactContext = useContext(contactContext);
  const text = useRef("");
  useEffect(() => {
    if (ContactContext.filtered === null) {
      text.current.value = "";
    }
  }, []);
  const onChange = (e) => {
    if (text.current.value !== "") {
      ContactContext.filterContacts(e.target.value);
    } else {
      ContactContext.clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
}

export default ContactFilter;
