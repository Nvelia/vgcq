import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import Spinner from "../../partials/Spinner";
import Message from "../../partials/Message";
import classnames from "classnames";
import ValidateBtns from "./../../auth/ValidateBtns";

import { isAnswerCorrect } from "./../../../utils/functions";
import { addAnswer } from "./../../../actions/authActions";

class CardList extends Component {
  state = {
    reversedCardsIds: [],
    cardsAnswered: [],
    cardsBadAnswered: [],
    answerTyped: {
      id: null,
      text: "",
    },
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.data) {
      const userCardsAnswered = [...user.data.cardsAnswered];
      this.setState({
        cardsAnswered: userCardsAnswered,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cardsBadAnswered, cardsAnswered } = this.state;
    const _this = this;
    const { user, addAnswer } = this.props;

    if (prevState.cardsAnswered !== cardsAnswered && user.data) {
      addAnswer(user.data.id, cardsAnswered);
    }

    if (prevProps.user.data !== this.props.user.data) {
      const userCardsAnswered = [...user.data.cardsAnswered];
      this.setState({
        cardsAnswered: userCardsAnswered,
      });
    }

    if (cardsBadAnswered.length > 0) {
      setTimeout(() => {
        _this.setState({ cardsBadAnswered: [] });
      }, 1000);
    }
  }

  turnCard = (card) => {
    const { reversedCardsIds } = this.state;
    let newCardIds = reversedCardsIds;
    if (reversedCardsIds.includes(card.id)) {
      newCardIds = reversedCardsIds.filter((id) => {
        if (id === card.id) {
          return null;
        }
        return id;
      });
      this.setState({ reversedCardsIds: newCardIds });
    } else {
      newCardIds.push(card.id);
      this.setState({ reversedCardsIds: newCardIds });
    }
  };

  copyAnswers(answerArray, cardId) {
    let newArray = [...answerArray];

    if (newArray.includes(cardId)) return;
    newArray.push(cardId.toString());

    return newArray;
  }

  handleAnswer = (e, card) => {
    e.preventDefault();

    const { cardsAnswered, cardsBadAnswered } = this.state;
    let answers = [];

    if (isAnswerCorrect(card.quiz, e.target[0].value)) {
      answers = this.copyAnswers(cardsAnswered, card.id);

      if (answers.length > 0) {
        this.setState({
          cardsAnswered: answers,
        });
      }
    } else {
      answers = this.copyAnswers(cardsBadAnswered, card.id);
      console.log(answers);
      if (answers.length > 0) {
        this.setState({
          cardsBadAnswered: answers,
        });
      }
    }
  };

  updateAnswerTyped = (value, id) => {
    this.setState({
      answerTyped: {
        id: id,
        text: value,
      },
    });
  };

  renderCard = (card) => {
    const {
      spinner,
      fromRandom,
      fromGamesheet,
      fromValidation,
      t,
    } = this.props;
    const {
      reversedCardsIds,
      cardsAnswered,
      cardsBadAnswered,
      answerTyped,
    } = this.state;

    return (
      <div
        className={classnames("card-container", {
          "--reversed": reversedCardsIds.includes(card.id),
          "--correct-answer": cardsAnswered.includes(card.id.toString()),
        })}
        key={card.id}
      >
        {fromValidation && <ValidateBtns card={card} />}
        <button
          className={classnames("turn-btn", {
            "--from-random": fromRandom,
          })}
          onClick={() => this.turnCard(card)}
        >
          <i className="fas fa-exchange-alt"></i>
        </button>
        <CardFront
          fromGamesheet={fromGamesheet}
          spinner={spinner}
          fromRandom={fromRandom}
          card={card}
          t={t}
        />

        <CardBack
          card={card}
          cardsAnswered={cardsAnswered}
          cardsBadAnswered={cardsBadAnswered}
          answerTyped={answerTyped}
          handleAnswerCallback={(e, card) => this.handleAnswer(e, card)}
          updateAnswerTypedCallback={(value, id) =>
            this.updateAnswerTyped(value, id)
          }
        />
      </div>
    );
  };

  render() {
    const { cards, spinner, currentPage, fromRandom, t } = this.props;

    if (spinner && currentPage < 2) {
      return <Spinner />;
    }

    if (fromRandom) {
      if (spinner) return <Spinner />;
      else if (cards) return cards && this.renderCard(cards);
      else return <Message message={t("card-list.no-card-found")} />;
    }

    return !fromRandom && cards && cards.length > 0 ? (
      <div className="cards-list">
        {cards.map((card) => this.renderCard(card))}
      </div>
    ) : (
      t("card-list.no-unpublished-card")
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  addAnswer,
};

CardList.propTypes = {
  cards: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  currentPage: PropTypes.number,
  user: PropTypes.object,
  addAnswer: PropTypes.func,
  spinner: PropTypes.bool,
  fromRandom: PropTypes.bool,
  fromGamesheet: PropTypes.bool,
  fromValidation: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CardList));
