import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import RegisterForm from "./../forms/RegisterForm";

const RegisterPart = (props) => {
  const { closeModal, changePageCallBack } = props;
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="login-message">
        <p>{t("register-part.already-member")}</p>
        <button className="custom-btn" onClick={changePageCallBack}>
          {t("register-part.login-part-button")}
        </button>
      </div>
      <div className="register-part">
        <h4>{t("register-part.title")}</h4>
        <RegisterForm closeModal={closeModal} />
        <button onClick={closeModal} className="custom-btn register-close-btn">
          &times;
        </button>
      </div>
    </Fragment>
  );
};

RegisterPart.propTypes = {
  closeModal: PropTypes.func,
  changePageCallBack: PropTypes.func,
};

export default RegisterPart;
