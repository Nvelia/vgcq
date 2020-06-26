import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CardList from "./gamesheet/CardList";
import { getRandomCard, randomCardUnload } from "./../../actions/cardActions";

const initialState = {
  randomCardFound: false,
};

class RandomCard extends Component {
  state = initialState;

  componentDidMount() {
    this.props.getRandomCard();
  }

  componentDidUpdate(prevProps) {
    const { randomCard } = this.props;
    if (randomCard && prevProps.randomCard !== randomCard) {
      this.setState({
        randomCardFound: true,
      });
    }
  }

  componentWillUnmount() {
    this.props.randomCardUnload();
    this.setState({ initialState });
  }

  updateRandomCard = () => {
    this.setState({ randomCardFound: false });
    this.props.getRandomCard();
  };

  render() {
    const { randomCard, isFetching } = this.props;
    const { randomCardFound } = this.state;
    return (
      <div className="random-card-container">
        <CardList cards={randomCard} spinner={isFetching} fromRandom={true} />
        {randomCardFound && (
          <button
            className="__refresh-random-card"
            onClick={this.updateRandomCard}
          >
            <i className="fas fa-redo-alt"></i>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  randomCard: state.cards.randomCard,
  isFetching: state.cards.isFetching,
});

const mapDispatchToProps = {
  getRandomCard,
  randomCardUnload,
};

RandomCard.propTypes = {
  randomCard: PropTypes.object,
  isFetching: PropTypes.bool,
  getRandomCard: PropTypes.func,
  randomCardUnload: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RandomCard);
