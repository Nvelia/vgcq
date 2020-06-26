import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import LoginPart from "./LoginPart";
import RegisterPart from "./RegisterPart";
import { modalUnload } from "../../actions/modalActions";

class LoginModal extends Component {
  state = {
    loginPage: true,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (
      (this.node && this.node.contains(e.target)) ||
      e.target.className === "header__login-btn"
    ) {
      return;
    }

    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.props.modalUnload();
  };

  changePageCallBack = () => {
    this.setState({ loginPage: !this.state.loginPage });
  };

  closeModal = () => {
    this.props.modalUnload();
  };

  render() {
    const { loginPage } = this.state;

    return (
      <div className="login-modal" ref={(node) => (this.node = node)}>
        {loginPage ? (
          <LoginPart
            history={this.props.history}
            closeModal={this.props.modalUnload}
            changePageCallBack={() => this.changePageCallBack()}
          />
        ) : (
          <RegisterPart
            closeModal={this.props.modalUnload}
            changePageCallBack={() => this.changePageCallBack()}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  modalUnload,
};

LoginModal.propTypes = {
  modalUnload: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(withRouter(LoginModal));
