import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import LoadMore from "./../compendium/buttons/LoadMore";
import GamesheetList from "../compendium/GamesheetList";
import CardList from "./../compendium/gamesheet/CardList";

import {
  getUserGamesheets,
  getUserCards,
  userGamesheetsUnload,
} from "./../../actions/authActions";

class Contributions extends Component {
  componentDidMount() {
    const { getUserGamesheets, getUserCards, auth } = this.props;
    if (auth.userId) {
      getUserGamesheets(auth.userId, 0);
      getUserCards(auth.userId, 0);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { getUserGamesheets, getUserCards, auth } = this.props;
    if (prevProps.auth.userId !== auth.userId) {
      getUserGamesheets(auth.userId, 0);
      getUserCards(auth.userId, 0);
    }
  }

  componentWillUnmount() {
    const { userGamesheetsUnload } = this.props;
    userGamesheetsUnload();
  }

  loadMoreGamesheets = () => {
    const { auth, getUserGamesheets } = this.props;
    return getUserGamesheets(auth.userId, 1, auth.user.gamesheetsCurrentPage);
  };

  loadMoreCards = () => {
    const { auth, getUserCards } = this.props;
    return getUserCards(auth.userId, 1, auth.user.gamesheetsCurrentPage);
  };

  render() {
    const { auth, history, t } = this.props;

    const showGamesheetsLoadMore =
      auth.user &&
      auth.user.gamesheetsPageCount > 1 &&
      auth.user.gamesheetsCurrentPage <= auth.user.gamesheetsPageCount;

    const showCardsLoadMore =
      auth.user &&
      auth.user.cardsPageCount > 1 &&
      auth.user.cardsCurrentPage <= auth.user.cardsPageCount;

    return (
      <div className="contributions-container">
        <div>
          <h6>{t("contributions.pending-gamesheets")}</h6>
          <div className="personnal-content">
            {auth && auth.user && (
              <GamesheetList
                gamesheets={auth.user.gamesheets && auth.user.gamesheets}
                spinner={
                  auth.user.gamesheetsLoading && auth.user.gamesheetsLoading
                }
                currentPage={auth.user.gamesheetsCurrentPage}
                history={history}
              />
            )}
            {showGamesheetsLoadMore && (
              <LoadMore
                currentPage={auth.user.gamesheets.currentPage}
                disabled={auth.user.gamesheetsLoading}
                onClick={() => this.loadMoreGamesheets()}
              />
            )}
          </div>
        </div>
        <div>
          <h6>{t("contributions.pending-cards")}</h6>
          <div className="personnal-content">
            {auth && auth.user && (
              <CardList
                cards={auth.user.cards && auth.user.cards}
                spinner={auth.user.cardsLoading && auth.user.cardsLoading}
                currentPage={auth.user.cardsCurrentPage}
              />
            )}
            {showCardsLoadMore && (
              <LoadMore
                currentPage={auth.user.cards.currentPage}
                disabled={auth.user.cardsLoading}
                onClick={() => this.loadMoreCards()}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getUserGamesheets,
  getUserCards,
  userGamesheetsUnload,
};

Contributions.propTypes = {
  aut: PropTypes.object,
  getUserGamesheets: PropTypes.func,
  getUserCards: PropTypes.func,
  userGamesheetsUnload: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(Contributions)));
