import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RequireAuth from "../../../HOC/RequireAuth";

class LikeButton extends Component {
  state = {
    liked: false,
  };

  componentDidMount() {
    const { auth, card } = this.props;

    if (card.likes.includes(auth.userId)) {
      this.setState({
        liked: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth, card } = this.props;

    if (prevProps !== this.props) {
      if (card.likes.includes(auth.userId)) {
        this.setState({
          liked: true,
        });
      } else {
        this.setState({
          liked: false,
        });
      }
    }
  }

  render() {
    const { card, likes, likeCardCallback } = this.props;
    const { liked } = this.state;

    function likeCard(card) {
      likeCardCallback(card);
    }

    return (
      <button onClick={() => likeCard(card)} className="positive-btn">
        {liked ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="far fa-heart" />
        )}
        {likes}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

LikeButton.propTypes = {
  auth: PropTypes.object,
  like: PropTypes.number,
  card: PropTypes.object,
  likeCardCallback: PropTypes.func,
};

export default connect(mapStateToProps, null)(RequireAuth(LikeButton));
