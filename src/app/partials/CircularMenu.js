import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CircularMenu = (props) => {
  const { user, userLogout } = props;
  return (
    <menu className="header__circular-menu__items-wrapper">
      <Link className="__menu-item fa fa-user" to="/mon-profil" />
      <Link className="__menu-item fas fa-pause-circle" to="/contributions" />
      <Link className="__menu-item fa fa-cog" to="/reglages" />
      <Link
        className="__menu-item fas fa-sign-out-alt"
        to="/"
        onClick={() => userLogout()}
      />
      {!user.data.roles.includes("ROLE_PLAYER") && (
        <Link className="__menu-item fas fa-check" to="/validation" />
      )}
    </menu>
  );
};

CircularMenu.propTypes = {
  user: PropTypes.object,
  userLogout: PropTypes.func,
};

export default CircularMenu;
