import React, { Component } from "react";

import frenchFlag from "./../../style/images/french-flag.png";
import ukFlag from "./../../style/images/uk-flag.png";

class Language extends Component {
  state = {
    displayLanguages: false,
    language: "",
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
    const language = window.localStorage.getItem("i18nextLng");
    if (language === "fr") {
      this.setState({
        language: "fr",
      });
    } else {
      this.setState({
        language: "en",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { language } = this.state;
    if (prevState.language !== "" && prevState.language !== language) {
      window.localStorage.setItem("i18nextLng", language);
      return window.location.reload(false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (
      (this.node && this.node.contains(e.target)) ||
      e.target.className === "fas fa-sort-down"
    ) {
      return;
    }

    this.setState({
      displayLanguages: false,
    });
  };

  render() {
    const { language, displayLanguages } = this.state;
    return (
      <div className="header__language-choice">
        {displayLanguages && (
          <div className="language-options" ref={(node) => (this.node = node)}>
            {language === "en" ? (
              <span onClick={() => this.setState({ language: "fr" })}>
                <img
                  src={frenchFlag}
                  alt="french flag icon"
                  className="header-flag-icon"
                />{" "}
                Français
              </span>
            ) : (
              <span onClick={() => this.setState({ language: "en" })}>
                <img
                  src={ukFlag}
                  alt="english flag icon"
                  className="header-flag-icon"
                />
                English
              </span>
            )}
          </div>
        )}
        {language === "fr" ? (
          <span>
            <img
              src={frenchFlag}
              alt="french flag icon"
              className="header-flag-icon"
            />
            Français{" "}
            <i
              className="fas fa-sort-down"
              onClick={() =>
                this.setState({ displayLanguages: !displayLanguages })
              }
            ></i>
          </span>
        ) : (
          <span>
            <img
              src={ukFlag}
              alt="english flag icon"
              className="header-flag-icon"
            />
            English{" "}
            <i
              className="fas fa-sort-down"
              onClick={() =>
                this.setState({ displayLanguages: !displayLanguages })
              }
            ></i>
          </span>
        )}
      </div>
    );
  }
}

export default Language;
