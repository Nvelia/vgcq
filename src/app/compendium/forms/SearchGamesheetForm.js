import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import AddFormButton from "./../buttons/AddFormButton";
import { renderField } from "../../forms/form";
import {
  searchGamesheet,
  searchUnload,
} from "../../../actions/gamesheetActions";
import { searchCards, cardsSearchUnload } from "../../../actions/cardActions";

let timeout;

class SearchGamesheetForm extends Component {
  state = {
    searchTags: null,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
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
    if (this.state.searchTags !== null) {
      this.setState({
        searchTags: null,
      });
      return this.props.reset();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchTags } = this.state;
    const {
      searchGamesheet,
      searchUnload,
      cardForm,
      searchCards,
      cardsSearchUnload,
      slug,
    } = this.props;

    if (prevState.searchTags !== searchTags) {
      if (searchTags !== null && !cardForm) {
        searchGamesheet(searchTags);
      } else if (searchTags !== null && searchTags.length > 2 && cardForm) {
        searchCards(searchTags, slug);
      } else {
        searchUnload();
        cardsSearchUnload();
      }
    }
  }

  updateSearchTags = (e) => {
    clearTimeout(timeout);
    const _this = this;

    setTimeout(function () {
      _this.setState({ searchTags: e.target.value });
    }, 200);
  };

  redirectToGamesheet = (gamesheet) => {
    return this.props.history.push(
      `/compendium/fiche-de-jeu/${gamesheet.slug}`
    );
  };

  onSubmit = (values) => {};

  render() {
    const { handleSubmit, gamesheets, cardForm, t } = this.props;

    return (
      <div
        className={classnames("search-bar", {
          "card-form": cardForm,
        })}
        ref={(node) => (this.node = node)}
      >
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <i className="fas fa-search search-icon"></i>
          <Field
            onChange={(e) => this.updateSearchTags(e)}
            name="search"
            placeholder={
              cardForm
                ? t("search-gamesheet-form.card-text")
                : t("search-gamesheet-form.gamesheet-text")
            }
            label={null}
            myInputValue={this.state.searchTags}
            searchBar
            type="text"
            component={renderField}
          />
        </form>
        {this.state.searchTags && !cardForm && (
          <div className="__search-suggestions">
            {gamesheets.suggestions &&
              gamesheets.suggestions.map((gamesheet) => {
                return (
                  <div
                    key={gamesheet.id}
                    className="__search-suggestions__suggestion-element"
                    onClick={() => this.redirectToGamesheet(gamesheet)}
                  >
                    {gamesheet.name}
                  </div>
                );
              })}
          </div>
        )}
        <AddFormButton cardForm={cardForm} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gamesheets: state.gamesheets,
});

const mapDispatchToProps = {
  searchGamesheet,
  searchUnload,
  searchCards,
  cardsSearchUnload,
};

SearchGamesheetForm.propTypes = {
  slug: PropTypes.string,
  gamesheets: PropTypes.object,
  cardForm: PropTypes.bool,
  searchGamesheet: PropTypes.func,
  searchUnload: PropTypes.func,
  searchCards: PropTypes.func,
  cardsSearchUnload: PropTypes.func,
};

export default reduxForm({
  form: "SearchGamesheetForm",
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(withTranslation()(SearchGamesheetForm)))
);
