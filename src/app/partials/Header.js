import React, { Component } from "react";
import Media from "react-media";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";

import UserMenu from "./UserMenu";
import Language from "./Language";
import logo from "./../../style/images/logo.png";

class Header extends Component {
  state = { displayMenu: false };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (
      (this.node && this.node.contains(e.target)) ||
      e.target.className === "menu-links" ||
      e.target.className === "menu-links-underline-from-center"
    ) {
      return;
    }

    this.setState({ displayMenu: false });
  };

  render() {
    const { displayMenu } = this.state;
    const { t } = this.props;

    return (
      <div className="header">
        <Language />

        <Media
          query="(max-width: 1024px)"
          render={() => (
            <p
              ref={(node) => (this.node = node)}
              className="menu-hamburger"
              onClick={() => this.setState({ displayMenu: !displayMenu })}
            >
              <i className="fas fa-bars"></i> Menu
            </p>
          )}
        />

        <img src={logo} alt="main logo" className="logo" />

        <ul
          className={classnames("header__menu", {
            "display-vertical": displayMenu,
          })}
        >
          <li>
            <NavLink
              className="menu-links-underline-from-center"
              to="/compendium"
              onClick={() => this.setState({ displayMenu: false })}
            >
              Compendium
            </NavLink>
          </li>

          <li>
            <NavLink
              className="menu-links"
              to="/quiz"
              onClick={() => this.setState({ displayMenu: false })}
            >
              {t("header.menu-link-2")}
            </NavLink>
          </li>
        </ul>

        <UserMenu />
      </div>
    );
  }
}

export default withTranslation()(Header);
