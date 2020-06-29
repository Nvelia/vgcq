import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { renderField } from "./form";
import { resetPassword } from "../../actions/authActions";
import { addFlashMessage } from "../../actions/flashMessageActions";
import { withTranslation } from "react-i18next";

class ChangePasswordForm extends Component {
  onSubmit = (values) => {
    const { resetPassword, userId, reset, addFlashMessage, t } = this.props;
    return resetPassword(userId, values).then(() => {
      reset();
      addFlashMessage({
        type: "success",
        text: t("change-password-form.flash-message-success"),
      });
    });
  };

  render() {
    const { handleSubmit, error, t } = this.props;

    return (
      <div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="oldPassword"
            label={t("change-password-form.old-password-label")}
            type="password"
            component={renderField}
          />
          <Field
            name="newPassword"
            label={t("change-password-form.new-password-label")}
            type="password"
            component={renderField}
          />
          <Field
            name="newRetypedPassword"
            label={t("change-password-form.retyped-new-password-label")}
            type="password"
            component={renderField}
          />

          <button type="submit">
            {t("change-password-form.submit-button")}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = {
  resetPassword,
  addFlashMessage,
};

ChangePasswordForm.propTypes = {
  userId: PropTypes.string,
  resetPassword: PropTypes.func,
  addFlashMessage: PropTypes.func,
};

export default reduxForm({ form: "ChangePasswordForm" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(ChangePasswordForm))
);
