import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import Spinner from "./../../partials/Spinner";

import { renderField } from "./../../forms/form";
import { cardAdd, cardEdit } from "./../../../actions/cardActions";
import { quizEdit } from "../../../actions/quizActions";
import { modalUnload } from "../../../actions/modalActions";
import { addFlashMessage } from "../../../actions/flashMessageActions";
import { submitCard } from "../../../utils/functions";

class CardForm extends Component {
  state = {
    addQuestion: false,
    acceptedAnswers: [],
    difficulty: "",
    remainingChars: 400,
    noDifficulty: false,
    noQuestion: false,
    noAnswers: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);

    const { card } = this.props;

    if (card) {
      this.setState({
        acceptedAnswers: card.quiz.acceptedAnswers,
        difficulty: card.quiz.difficulty.name.toLowerCase(),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }

    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.props.modalUnload();
  };

  changeState = (stateElement, stateValue) => {
    if (stateValue) {
      const key = stateElement;
      const obj = {};
      obj[key] = false;

      this.setState(obj);
    }
  };

  onSubmit = (values) => {
    const { gamesheet, cardAdd, card, cardEdit, quizEdit } = this.props;
    const {
      acceptedAnswers,
      difficulty,
      noDifficulty,
      noQuestion,
      noAnswers,
    } = this.state;

    this.changeState("noDifficulty", noDifficulty);
    this.changeState("noQuestion", noQuestion);
    this.changeState("noAnswers", noAnswers);

    if (difficulty === "") {
      return this.setState({
        noDifficulty: true,
      });
    }

    if (!values.quiz) {
      return this.setState({
        noQuestion: true,
        noAnswers: true,
      });
    } else if (
      values.quiz &&
      (!values.quiz.question || values.quiz.question === "")
    ) {
      return this.setState({
        noQuestion: true,
      });
    } else if (
      values.quiz &&
      (!values.quiz.acceptedAnswers || values.quiz.acceptedAnswers[0] === "")
    ) {
      return this.setState({
        noAnswers: true,
      });
    }

    if (values.quiz) {
      values.quiz.acceptedAnswers = acceptedAnswers;
      values.quiz.difficulty = `/api/difficulties/${difficulty}`;
    }

    submitCard(
      card && card,
      values,
      cardEdit,
      cardAdd,
      quizEdit,
      gamesheet
    ).then(() => this.handleClickOutside());
  };

  answersToArray = (e) => {
    let array = e.target.value.split(",").map((el) => {
      return el.trim();
    });
    this.setState({ acceptedAnswers: array });
  };

  changeDifficulty = (e) => {
    this.setState({
      difficulty: e.target.value,
    });
  };

  updateCharacters = (e) => {
    this.setState({
      remainingChars: 400 - e.target.value.length,
    });
  };

  render() {
    const { handleSubmit, submitting, card, t, posting } = this.props;
    const {
      acceptedAnswers,
      difficulty,
      remainingChars,
      noDifficulty,
      noQuestion,
      noAnswers,
    } = this.state;
    const predefinedAcceptedAnswers =
      card && card.quiz.acceptedAnswers.toString();

    return (
      <div className="add-card-form" ref={(node) => (this.node = node)}>
        <button className="close-btn" onClick={() => this.handleClickOutside()}>
          &times;
        </button>

        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            onChange={(e) => this.updateCharacters(e)}
            predefinedText={card && card.content}
            name="content"
            label={t("card-form.content-label", { number: remainingChars })}
            type="textarea"
            component={renderField}
          />

          {noQuestion && (
            <span className="empty-field">{t("card-form.no-question")}</span>
          )}
          <Field
            predefinedText={card && card.quiz.question}
            placeholder={t("card-form.question-placeholder")}
            name="quiz.question"
            label={t("card-form.question-label")}
            type="input"
            component={renderField}
          />

          {noAnswers && (
            <span className="empty-field">{t("card-form.no-answers")}</span>
          )}
          <Field
            predefinedText={card && predefinedAcceptedAnswers}
            onBlur={(e) => this.answersToArray(e)}
            placeholder={t("card-form.answers-placeholder")}
            name="quiz.acceptedAnswers"
            label={t("card-form.answers-label")}
            type="input"
            component={renderField}
          />

          {acceptedAnswers.length > 0 && (
            <p>
              {t("card-form.answers-placeholder")}:{" "}
              {acceptedAnswers.map((answer, i = 1) => {
                return (
                  <span key={i}>
                    {answer} {i !== acceptedAnswers.length - 1 && "/ "}{" "}
                  </span>
                );
              })}
            </p>
          )}

          {noDifficulty && (
            <span className="empty-field">{t("card-form.no-difficulty")}</span>
          )}
          <select
            value={difficulty}
            onChange={(e) => this.changeDifficulty(e)}
            name="difficulty-options"
            id="difficulty-options"
            className={classnames("", {
              "red-border": noDifficulty,
            })}
          >
            <option disabled value="">
              {t("card-form.difficulty-label")}
            </option>

            <option value="facile">{t("card-form.easy")}</option>
            <option value="normal">{t("card-form.medium")}</option>
            <option value="difficile">{t("card-form.hard")}</option>
          </select>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {posting ? <Spinner /> : t("card-form.submit-button")}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gamesheet: state.gamesheets.data,
  card: state.modal.cardToEdit,
  posting: state.cards.posting,
});

const mapDispatchToProps = {
  cardAdd,
  cardEdit,
  modalUnload,
  addFlashMessage,
  quizEdit,
};

CardForm.propTypes = {
  gamesheet: PropTypes.object,
  card: PropTypes.object,
  posting: PropTypes.bool,
  cardAdd: PropTypes.func,
  cardEdit: PropTypes.func,
  modalUnload: PropTypes.func,
  addFlashMessage: PropTypes.func,
  quizEdit: PropTypes.func,
};

export default reduxForm({
  form: "CardForm",
})(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CardForm)));
