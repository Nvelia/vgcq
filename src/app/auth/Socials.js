import React, { Component, Fragment } from "react";

import Spinner from "./../partials/Spinner";
import RequireAuth from "../../HOC/RequireAuth";
import { SERVER_ROOT } from "./../../utils/agent";

class Socials extends Component {
  state = {
    clicked: false,
  };

  buttonClicked = () => {
    this.setState({
      clicked: true,
    });
  };

  render() {
    return (
      <ul className="social-btns">
        {this.state.clicked ? (
          <Spinner />
        ) : (
          <Fragment>
            <li className="google" onClick={() => this.buttonClicked()}>
              <a href={`${SERVER_ROOT}connect/google`}>
                <i className="fab fa-google-plus-square"></i>
              </a>
            </li>
            <li className="twitch" onClick={() => this.buttonClicked()}>
              <a href={`${SERVER_ROOT}connect/twitch`}>
                <i className="fab fa-twitch"></i>
              </a>
            </li>
          </Fragment>
        )}
      </ul>
    );
  }
}

export default RequireAuth(Socials);
