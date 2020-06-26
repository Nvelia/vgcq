import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import Spinner from "../partials/Spinner";
import Message from "../partials/Message";
import FavoriteButton from "./buttons/FavoriteButton";
import ValidateBtns from "./../auth/ValidateBtns";
import { SERVER_ROOT } from "./../../utils/agent";

class GamesheetList extends Component {
  redirectToGamesheet = (e, gamesheet) => {
    if (
      e.target.className === "add-to-bookmark-btn" ||
      e.target.className === "far fa-star" ||
      e.target.className === "fas fa-star" ||
      e.target.className === "fas fa-check" ||
      e.target.className === "fas fa-edit" ||
      e.target.className === "fas fa-trash" ||
      e.target.className === "validate-btn" ||
      e.target.className === "edit-btn"
    ) {
      return;
    }

    return this.props.history.push(
      `/compendium/fiche-de-jeu/${gamesheet.slug}`
    );
  };

  renderGamesheets = (gamesheets) => {
    const { fromValidation, t } = this.props;

    return gamesheets.map((gamesheet) => (
      <div
        className="gamesheet-card"
        key={gamesheet.id}
        onClick={(e) => this.redirectToGamesheet(e, gamesheet)}
      >
        {fromValidation && <ValidateBtns gamesheet={gamesheet} />}
        <img src={`${SERVER_ROOT}${gamesheet.image.url}`} alt="" />
        <FavoriteButton gamesheet={gamesheet} />

        <p className="gamesheet-data">
          <span className="category-title">{gamesheet.name}</span>
          <span className="gamesheet-cards">
            {gamesheet.cardsQty}{" "}
            {gamesheet.cardsQty > 1
              ? t("gamesheet-list.high-cards-number")
              : t("gamesheet-list.low-cards-number")}
            <span>
              {t("gamesheet-list.author")}: {gamesheet.Author.username}
            </span>
          </span>
        </p>
      </div>
    ));
  };

  render() {
    const { gamesheets, spinner, currentPage, t } = this.props;
    if (spinner && currentPage < 2) {
      return <Spinner />;
    }

    if ((gamesheets && gamesheets.length === 0) || gamesheets === null) {
      return <Message message={t("gamesheet-list.no-sheet-message")} />;
    }

    return gamesheets && gamesheets.length > 0 ? (
      <div className="--gamesheet-list">
        {this.renderGamesheets(gamesheets)}
      </div>
    ) : (
      <Message message={t("gamesheet-list.no-unpublished-sheet")} />
    );
  }
}

GamesheetList.propTypes = {
  gamesheets: PropTypes.array,
  spinner: PropTypes.bool,
  currentPage: PropTypes.number,
  fromValidation: PropTypes.bool,
};

export default withTranslation()(GamesheetList);
