import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import LoadMore from "./../compendium/buttons/LoadMore";
import GamesheetList from "../compendium/GamesheetList";
import CardList from "./../compendium/gamesheet/CardList";
import {
  getUnpublishedGamesheets,
  gamesheetListUnload,
} from "./../../actions/gamesheetActions";
import { getUnpublishedCards, cardsUnload } from "./../../actions/cardActions";

class Validation extends Component {
  componentDidMount() {
    const { getUnpublishedGamesheets, getUnpublishedCards } = this.props;
    getUnpublishedGamesheets();
    getUnpublishedCards();
  }

  componentWillUnmount() {
    const { gamesheetListUnload, cardsUnload } = this.props;
    gamesheetListUnload();
    cardsUnload();
  }

  loadMoreGamesheets = () => {
    const { getUnpublishedGamesheets, gamesheets } = this.props;
    return getUnpublishedGamesheets(gamesheets.currentPage);
  };

  loadMoreCards = () => {
    const { getUnpublishedCards, cards } = this.props;
    return getUnpublishedCards(cards.currentPage);
  };

  render() {
    const { gamesheets, history, cards, t } = this.props;

    const showGamesheetsLoadMore =
      gamesheets &&
      gamesheets.pageCount > 1 &&
      gamesheets.currentPage <= gamesheets.pageCount;

    const showCardsLoadMore =
      cards && cards.pageCount > 1 && cards.currentPage <= cards.pageCount;

    return (
      <div className="validation-container">
        <div>
          <h6>{t("validation.pending-gamesheets")}</h6>
          <div className="gamesheet-container gamesheet-validation">
            <GamesheetList
              fromValidation={true}
              gamesheets={gamesheets.list && gamesheets.list}
              spinner={gamesheets.isFetching}
              currentPage={gamesheets.currentPage}
              history={history}
              validation={true}
            />
            {showGamesheetsLoadMore && (
              <LoadMore
                currentPage={gamesheets.currentPage}
                disabled={gamesheets.isFetching}
                onClick={() => this.loadMoreGamesheets()}
              />
            )}
          </div>

          <div>
            <h6>{t("validation.pending-cards")}</h6>
            <div className="cards-list-container">
              <CardList
                fromValidation={true}
                cards={cards.list}
                spinner={cards.isFetching}
                currentPage={cards.currentPage}
              />
              {showCardsLoadMore && (
                <LoadMore
                  currentPage={cards.currentPage}
                  disabled={cards.isFetching}
                  onClick={() => this.loadMoreCards()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gamesheets: state.gamesheets,
  cards: state.cards,
});

const mapDispatchToProps = {
  getUnpublishedGamesheets,
  gamesheetListUnload,
  getUnpublishedCards,
  cardsUnload,
};

Validation.propTypes = {
  gamesheets: PropTypes.object,
  cards: PropTypes.object,
  getUnpublishedGamesheets: PropTypes.func,
  gamesheetListUnload: PropTypes.func,
  getUnpublishedCards: PropTypes.func,
  cardsUnload: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(Validation)));
