import React from "react";
import PropTypes from "prop-types";

/**
 * Affichage d'un message lors d'un non chargement (par exemple)
 */

const Message = (props) => {
  const { message } = props;
  return <div className="message-container">{message}</div>;
};

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
