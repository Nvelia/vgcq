import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import CardList from "./CardList";
import SortingContainer from "../buttons/SortingContainer";
import GamesheetHeader from "./GamesheetHeader";
import Spinner from "../../partials/Spinner";
import Message from "../../partials/Message";
import SearchGamesheetForm from "../forms/SearchGamesheetForm";
import LoadMore from "../buttons/LoadMore";

import {
  fetchGamesheet,
  gamesheetUnload,
} from "../../../actions/gamesheetActions";
import { getCards, cardsUnload } from "../../../actions/cardActions";

class Gamesheet extends Component {
  state = {
    sorting: "most-popular",
  };

  componentDidMount() {
    const { gamesheet, fetchGamesheet } = this.props;
    const { slug } = this.props.match.params;

    if (!gamesheet.data) {
      return fetchGamesheet(slug);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { gamesheet, fetchGamesheet, getCards } = this.props;
    const { slug } = this.props.match.params;
    const { sorting } = this.state;

    if (prevProps.match.params.slug !== slug) {
      return fetchGamesheet(slug);
    }

    if (prevProps.gamesheet.data !== gamesheet.data && gamesheet.data) {
      return getCards(slug, sorting, 1);
    }

    if (prevState.sorting !== sorting) {
      return getCards(slug, sorting, 1);
    }
  }

  componentWillUnmount() {
    const { cardsUnload, gamesheetUnload } = this.props;
    gamesheetUnload();
    cardsUnload();
  }

  renderCards = () => {
    const { cards, t } = this.props;

    if (cards.isSearching || (cards.isFetching && cards.currentPage < 2)) {
      return <Spinner />;
    } else {
      if (cards.suggestions && cards.suggestions.length > 0) {
        return (
          <CardList cards={cards.suggestions} fromGamesheet={true}></CardList>
        );
      } else if (cards.list && cards.list.length > 0) {
        return <CardList cards={cards.list} fromGamesheet={true}></CardList>;
      } else {
        return <Message message={t("gamesheet.no-cards")} />;
      }
    }
  };

  loadMoreCards = (slug) => {
    const { cards, getCards } = this.props;
    return getCards(slug, this.state.sorting, cards.currentPage);
  };

  render() {
    const { gamesheet, cards, t } = this.props;

    const showLoadMore =
      cards.pageCount > 1 && cards.currentPage <= cards.pageCount;

    if (gamesheet.isFetching) {
      return <Spinner />;
    }

    if (!gamesheet.isFetching && !gamesheet.data) {
      return <Message message={t("gamesheet.page-not-found")} />;
    }

    if (gamesheet.data && !gamesheet.data.published) {
      return <Message message={t("gamesheet.in-validation")} />;
    }

    return (
      gamesheet.data && (
        <div className="gamesheet-page">
          <GamesheetHeader gamesheet={gamesheet.data} />
          <SearchGamesheetForm cardForm={true} slug={gamesheet.data.slug} />

          <div className="cards-list-container">
            <SortingContainer
              sortCards={true}
              updateSortingCallback={(sorting) =>
                this.setState({
                  sorting: sorting,
                })
              }
            />

            {this.renderCards()}

            {showLoadMore && (
              <LoadMore
                searchingCards={cards.isSearching}
                loadCards={true}
                currentPage={cards.currentPage}
                disabled={cards.isFetching}
                onClick={() => this.loadMoreCards(gamesheet.data.slug)}
              />
            )}
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  gamesheet: state.gamesheets,
  cards: state.cards,
});

const mapDispatchToProps = {
  fetchGamesheet,
  gamesheetUnload,
  cardsUnload,
  getCards,
};

Gamesheet.propTypes = {
  gamesheet: PropTypes.object,
  cards: PropTypes.object,
  fetchGamesheet: PropTypes.func,
  gamesheetUnload: PropTypes.func,
  cardsUnload: PropTypes.func,
  getCards: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Gamesheet));
