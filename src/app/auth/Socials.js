import React from "react";

import RequireAuth from "../../HOC/RequireAuth";

const Socials = (props) => {
  function errorMessage() {
    props.errorMessageCallback();
  }

  return (
    <ul className="social-btns">
      <li className="facebook" onClick={errorMessage}>
        <i className="fab fa-facebook-square"></i>
      </li>
      <li className="twitter" onClick={errorMessage}>
        <i className="fab fa-twitter-square"></i>
      </li>
      <li className="google" onClick={errorMessage}>
        <i className="fab fa-google-plus-square"></i>
      </li>
    </ul>
  );
};

export default RequireAuth(Socials);
