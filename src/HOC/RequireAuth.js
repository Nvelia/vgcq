import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { addFlashMessage } from "./../actions/flashMessageActions";
import { likeCard } from "./../actions/cardActions";
import { addToBookmark } from "./../actions/authActions";
import { openCardForm, openGamesheetForm } from "./../actions/modalActions";

export default function (ChildComponent) {
  class RequireAuth extends Component {
    likeCard = (card) => {
      const { auth, likeCard, addFlashMessage, t } = this.props;
      if (auth.user.data) {
        likeCard(card, auth.user.data.id);
      } else {
        addFlashMessage({
          type: "error",
          text: t("require-auth.like-card"),
        });
      }
    };

    handleBookmark = (gamesheetId) => {
      const { auth, addToBookmark, addFlashMessage, t } = this.props;

      if (auth.user.data) {
        addToBookmark(auth.user.data, gamesheetId);
      } else {
        addFlashMessage({
          type: "error",
          text: t("require-auth.add-favorite"),
        });
      }
    };

    addCard = () => {
      const { auth, addFlashMessage, modal, openCardForm, t } = this.props;

      if (auth.user.data) {
        openCardForm(!modal.cardFormOpened);
      } else {
        addFlashMessage({
          type: "error",
          text: t("require-auth.add-card"),
        });
      }
    };

    addGamesheet = () => {
      const { auth, modal, openGamesheetForm, addFlashMessage, t } = this.props;

      if (auth.user.data) {
        openGamesheetForm(!modal.gamesheetFormOpened);
      } else {
        addFlashMessage({
          type: "error",
          text: t("require-auth.add-gamesheet"),
        });
      }
    };

    errorMessage = () => {
      this.props.addFlashMessage({
        type: "error",
        text: this.props.t("require-auth.unavailable"),
      });
    };

    render() {
      return (
        <ChildComponent
          {...this.props}
          handleBookmarkCallback={(gamesheetId) =>
            this.handleBookmark(gamesheetId)
          }
          likeCardCallback={(card) => this.likeCard(card)}
          addCardCallback={() => this.addCard()}
          addGamesheetCallback={() => this.addGamesheet()}
          errorMessageCallback={() => this.errorMessage()}
        />
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      modal: state.modal.cardFormOpened,
    };
  };

  const mapDispatchToProps = {
    addFlashMessage,
    openCardForm,
    openGamesheetForm,
    likeCard,
    addToBookmark,
  };

  RequireAuth.propTypes = {
    auth: PropTypes.object,
    modal: PropTypes.bool,
    addFlashMessage: PropTypes.func,
    openCardForm: PropTypes.func,
    openGamesheetForm: PropTypes.func,
    likeCard: PropTypes.func,
    addToBookmark: PropTypes.func,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(RequireAuth));
}
