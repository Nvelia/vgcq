import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { renderField } from "./form";
import { userRegistration } from "../../actions/authActions";
import { addFlashMessage } from "../../actions/flashMessageActions";
import { withTranslation } from "react-i18next";

class RegisterForm extends Component {
  state = {
    terms: false,
  };

  onTermsClick = (e) => {
    this.setState({ terms: !this.state.terms });
  };

  onSubmit = (values) => {
    const { userRegistration, closeModal, addFlashMessage, t } = this.props;

    return userRegistration(values).then(() => {
      addFlashMessage({
        type: "success",
        text: t("register-form.flash-message-success"),
      });
      return closeModal();
    });
  };

  render() {
    const { handleSubmit, submitting, t } = this.props;
    return (
      <form className="mt4" onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="username"
          label={t("register-form.username-label")}
          type="text"
          component={renderField}
        />
        <Field
          name="password"
          label={t("register-form.password-label")}
          type="password"
          component={renderField}
        />
        <Field
          name="retypedPassword"
          label={t("register-form.retyped-password-label")}
          type="password"
          component={renderField}
        />
        <Field
          name="email"
          label={t("register-form.email-label")}
          type="text"
          component={renderField}
        />

        <div className="form-check form-group">
          <input
            type="checkbox"
            value={false}
            onClick={this.onTermsClick}
            className="form-check-input"
          />
          <label className="form-check-label">
            {t("register-form.cgu-text")}{" "}
            <a href="/cgu">{t("register-form.cgu-link")}</a>
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="custom-btn login-btn"
            disabled={submitting || !this.state.terms}
          >
            {t("register-form.register-button")}
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  userRegistration,
  addFlashMessage,
};

RegisterForm.propTypes = {
  userRegistration: PropTypes.func,
  addFlashMessage: PropTypes.func,
};

export default reduxForm({
  form: "RegisterForm",
})(connect(null, mapDispatchToProps)(withTranslation()(RegisterForm)));
