import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import Socials from "./Socials";
import LoginForm from "./../forms/LoginForm";

const LoginPart = (props) => {
  const { closeModal, history, changePageCallBack } = props;
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="login-part">
        <button onClick={closeModal} className="custom-btn login-close-btn">
          &times;
        </button>
        <h4>{t("login-part.title")}</h4>
        <Socials />
        <p>{t("login-part.connect-text")}</p>
        <LoginForm history={history} />
      </div>
      <div className="register-message">
        <p>{t("login-part.new-to-app")}</p>
        <button className="custom-btn" onClick={changePageCallBack}>
          {t("login-part.join")}
        </button>
      </div>
    </Fragment>
  );
};

LoginPart.propTypes = {
  changePageCallBack: PropTypes.func,
  closeModal: PropTypes.func,
};

export default LoginPart;
