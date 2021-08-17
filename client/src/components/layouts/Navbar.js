import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import contactContext from "../../context/contact/contactContext";

function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const ContactContext = useContext(contactContext);
  const onLogout = () => {
    authContext.logout();
    ContactContext.clearContact();
  };

  const authLinks = (
    <>
      <li>Hello {authContext.user && authContext.user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        {authContext.isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
