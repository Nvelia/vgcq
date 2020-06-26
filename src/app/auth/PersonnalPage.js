import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import GamesheetList from "../compendium/GamesheetList";
import CardList from "./../compendium/gamesheet/CardList";
import BookmarkList from "./BookmarkList";
import LoadMore from "./../compendium/buttons/LoadMore";
import {
  getUserGamesheets,
  getUserCards,
  userGamesheetsUnload,
} from "./../../actions/authActions";
import { SERVER_ROOT } from "./../../utils/agent";

class PersonnalPage extends Component {
  componentDidMount() {
    const { getUserGamesheets, getUserCards, auth } = this.props;
    if (auth.userId) {
      getUserGamesheets(auth.userId, 1);
      getUserCards(auth.userId, 1);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { getUserGamesheets, getUserCards, auth } = this.props;
    if (prevProps.auth.userId !== auth.userId) {
      getUserGamesheets(auth.userId, 1);
      getUserCards(auth.userId, 1);
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
      <div className="personnal-page">
        <div className="personnal-page__header">
          <div className="bar backbar" />

          <div className="bar frontbar">
            {auth.user.data && (
              <div className="image-and-title">
                <img
                  src={`${SERVER_ROOT}${auth.user.data.avatar.url}`}
                  alt={`avatar de ${auth.user.data.username}`}
                />

                <div>
                  <h2>{auth.user.data.username}</h2>
                  {/* <p>
                    0 / 18 titres obtenus <br />0 / 1702 badges de carte obtenus
                  </p> */}
                </div>
                <div className="to-settings">
                  <Link to="/reglages">
                    <i className="fas fa-cogs" /> {t("personnal-page.settings")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="personnal-page__container">
          <div className="bookmarks">
            <h6>{t("personnal-page.favorite-sheets")}</h6>
            <div className="personnal-content">
              <BookmarkList
                loading={!auth.user.data}
                bookmarks={auth.user.data && auth.user.data.bookmarks}
                history={history}
              />
            </div>
          </div>
          {/* <div className="achievements">
            <h6>Titres obtenus</h6>
            <div className="personnal-content">
              {auth.user.data &&
              auth.user.data.achievements &&
              auth.user.data.achievements.length > 0
                ? ""
                : "Aucun titres obtenus."}
            </div>
          </div> */}
          <div className="personnal-sheets">
            <h6>{t("personnal-page.published-gamesheets")}</h6>
            <div className="gamesheet-container">
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
          <div className="personnal-cards">
            <h6>{t("personnal-page.published-cards")}</h6>
            <div className="cards-list-container">
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

PersonnalPage.propTypes = {
  auth: PropTypes.object,
  getUserGamesheets: PropTypes.func,
  getUserCards: PropTypes.func,
  userGamesheetsUnload: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(PersonnalPage)));
