import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const CardBack = (props) => {
  const {
    card,
    cardsAnswered,
    cardsBadAnswered,
    answerTyped,
    handleAnswerCallback,
    updateAnswerTypedCallback,
  } = props;

  function handleAnswer(e) {
    handleAnswerCallback(e, card);
  }

  function updateAnswerTyped(e) {
    updateAnswerTypedCallback(e.target.value, card.id);
  }

  return (
    <div className="--card-back">
      <div className="question">
        <p>{card.quiz.question}</p>
        <form
          onSubmit={(e) => handleAnswer(e)}
          className={classnames("", {
            "--bad-answered": cardsBadAnswered.includes(card.id),
          })}
        >
          <input
            type="text"
            disabled={cardsAnswered.includes(card.id.toString())}
            onChange={(e) => updateAnswerTyped(e)}
            value={
              cardsAnswered.includes(card.id.toString())
                ? card.quiz.acceptedAnswers[0]
                : card.id === answerTyped.id
                ? answerTyped.text
                : ""
            }
          />
          <button>OK</button>
        </form>
      </div>
    </div>
  );
};

CardBack.propTypes = {
  card: PropTypes.object,
  cardsAnswered: PropTypes.array,
  cardsBadAnswered: PropTypes.array,
  answerTyped: PropTypes.object,
  handleAnswerCallback: PropTypes.func,
  updateAnswerTypedCallback: PropTypes.func,
};

export default CardBack;
