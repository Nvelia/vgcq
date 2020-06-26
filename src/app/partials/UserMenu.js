import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import Spinner from "./Spinner";
import CircularMenu from "./CircularMenu";

import { setModalState } from "./../../actions/modalActions";
import { userLogout } from "./../../actions/authActions";

import { SERVER_ROOT } from "./../../utils/agent";

class UserMenu extends Component {
  state = {
    activeMenu: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }

    this.setState({ activeMenu: false });
  };

  render() {
    const { auth, setModalState, userLogout, t } = this.props;
    const { activeMenu } = this.state;

    return (
      <Fragment>
        {!auth.isAuthenticated ? (
          <button
            className="header__login-btn"
            onClick={() => setModalState(true)}
          >
            {t("user-menu.login-button")}
          </button>
        ) : auth.user.data ? (
          <div
            ref={(node) => (this.node = node)}
            className={classnames("header__circular-menu", {
              "--is-active": activeMenu,
            })}
            onClick={() => this.setState({ activeMenu: !activeMenu })}
          >
            <img
              src={`${SERVER_ROOT}${auth.user.data.avatar.url}`}
              alt={`avatar de ${auth.user.data.username}`}
            />

            <CircularMenu user={auth.user} userLogout={userLogout} />
          </div>
        ) : (
          <Spinner from="userpage" />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  setModalState,
  userLogout,
};

UserMenu.propTypes = {
  auth: PropTypes.object,
  setModalState: PropTypes.func,
  userLogout: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(UserMenu));
