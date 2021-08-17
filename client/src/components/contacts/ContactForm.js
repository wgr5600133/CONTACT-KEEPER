import React, { useState, useContext, useEffect } from "react";
import contactContext from "../../context/contact/contactContext";
function ContactForm(props) {
  const ContactContext = useContext(contactContext);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  useEffect(() => {
    if (ContactContext.current !== null) {
      setContact(ContactContext.current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [ContactContext, ContactContext.current]);
  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (ContactContext.current === null) {
      ContactContext.addContact(contact);
    } else {
      ContactContext.updateContact(contact);
    }
    clearAll();
  };
  const clearAll = () => {
    ContactContext.clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {ContactContext.current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />{" "}
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === "personal"}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        checked={type === "professional"}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={ContactContext.current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {ContactContext.current && (
        <button className="btn btn-light btn-block" onClick={clearAll}>
          Clear
        </button>
      )}
    </form>
  );
}

export default ContactForm;
