import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

import RequireAuth from "./../../../HOC/RequireAuth";

const AddFormButton = (props) => {
  const { cardForm } = props;
  const { t } = useTranslation();

  function addGamesheet() {
    props.addGamesheetCallback();
  }

  function addCard() {
    props.addCardCallback();
  }

  return (
    <button
      className={classnames("", {
        "add-card": cardForm,
        "add-gamesheet": !cardForm,
      })}
      onClick={cardForm ? () => addCard() : () => addGamesheet()}
    >
      {cardForm
        ? t("add-form-button.card-text")
        : t("add-form-button.gamesheet-text")}
    </button>
  );
};

AddFormButton.propTypes = {
  cardForm: PropTypes.bool,
  addGamesheetCallback: PropTypes.func,
  addCardCallback: PropTypes.func,
};

export default RequireAuth(AddFormButton);
