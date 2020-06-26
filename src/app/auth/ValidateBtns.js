import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { validateCard, deleteCard } from "./../../actions/cardActions";
import { validateQuiz } from "./../../actions/quizActions";
import {
  deleteGamesheet,
  validateGamesheet,
} from "./../../actions/gamesheetActions";
import { openCardForm, openGamesheetForm } from "./../../actions/modalActions";

class ValidateBtns extends Component {
  validate = () => {
    const {
      card,
      validateCard,
      gamesheet,
      validateGamesheet,
      validateQuiz,
    } = this.props;

    if (window.confirm("Êtes-vous sûr de vouloir valider cette carte?")) {
      if (card) {
        validateQuiz(card.quiz.id);
        validateCard(card.id);
      } else if (gamesheet) validateGamesheet(gamesheet.slug);
    }
  };

  edit = () => {
    const {
      card,
      openCardForm,
      modal,
      gamesheet,
      openGamesheetForm,
    } = this.props;

    if (card) openCardForm(!modal.cardFormOpened, card);
    else if (gamesheet)
      openGamesheetForm(!modal.gamesheetFormOpened, gamesheet);
  };

  delete = () => {
    const { card, deleteCard, gamesheet, deleteGamesheet } = this.props;
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette carte?")) {
      if (card) deleteCard(card.id);
      else if (gamesheet) deleteGamesheet(gamesheet.slug);
    }
  };

  render() {
    return (
      <div className="validate-btns">
        <button className="validate-btn" onClick={() => this.validate()}>
          <i className="fas fa-check"></i>
        </button>
        <button className="edit-btn" onClick={() => this.edit()}>
          <i className="fas fa-edit"></i>
        </button>
        <button className="delete-btn" onClick={() => this.delete()}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  modal: state.modal,
});

const mapDispatchToProps = {
  validateCard,
  deleteCard,
  openCardForm,
  openGamesheetForm,
  deleteGamesheet,
  validateGamesheet,
  validateQuiz,
};

ValidateBtns.propTypes = {
  modal: PropTypes.object,
  validateCard: PropTypes.func,
  deleteCard: PropTypes.func,
  openCardForm: PropTypes.func,
  openGamesheetForm: PropTypes.func,
  deleteGamesheet: PropTypes.func,
  validateGamesheet: PropTypes.func,
  validateQuiz: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateBtns);
