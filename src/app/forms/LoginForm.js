import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import Spinner from "./../partials/Spinner";

import { renderField } from "./form";
import { userLoginAttempt } from "../../actions/authActions";
import { modalUnload } from "../../actions/modalActions";
import { withTranslation } from "react-i18next";

class LoginForm extends Component {
  onSubmit = (values) => {
    return this.props.userLoginAttempt(values.username, values.password);
  };

  componentDidUpdate(prevProps, prevState) {
    const { auth, modalUnload } = this.props;
    if (prevProps.auth.token !== auth.token) {
      modalUnload();
    }
  }

  render() {
    const { handleSubmit, error, auth, t } = this.props;
    return (
      <div className="text-center">
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="mt4" onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="username"
            label={t("login-form.username-label")}
            type="text"
            component={renderField}
          />
          <Field
            name="password"
            label={t("login-form.password-label")}
            type="password"
            component={renderField}
          />

          <a className="forgotten-password-link" href="/reset-password">
            {t("login-form.forgotten-pass")}
          </a>

          <button type="submit" className="custom-btn login-btn">
            {auth.isFetching ? <Spinner /> : t("login-form.connect-button")}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  userLoginAttempt,
  modalUnload,
};

LoginForm.propTypes = {
  auth: PropTypes.object,
  userLoginAttempt: PropTypes.func,
  modalUnload: PropTypes.func,
};

export default reduxForm({ form: "LoginForm" })(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LoginForm))
);
