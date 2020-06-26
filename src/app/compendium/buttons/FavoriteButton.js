import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RequireAuth from "../../../HOC/RequireAuth";

class FavoriteButton extends Component {
  state = {
    favorite: false,
  };

  componentDidMount() {
    const { auth, gamesheet } = this.props;

    if (
      auth.user.data &&
      auth.user.data.bookmarks.find((el) => el["@id"] === gamesheet["@id"])
    ) {
      this.setState({
        favorite: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { auth, gamesheet } = this.props;
    if (prevProps.auth !== this.props.auth && auth.user.data) {
      if (
        auth.user.data.bookmarks.find((el) => el["@id"] === gamesheet["@id"])
      ) {
        this.setState({
          favorite: true,
        });
      } else {
        this.setState({
          favorite: false,
        });
      }
    }
  }

  render() {
    const { gamesheet, handleBookmarkCallback } = this.props;
    const { favorite } = this.state;

    function handleBookmarkOnClick(gamesheetId) {
      handleBookmarkCallback(gamesheetId);
    }

    return (
      <button
        className="add-to-bookmark-btn"
        onClick={() => handleBookmarkOnClick(gamesheet["@id"])}
        from="favorite"
      >
        {favorite ? (
          <i className="fas fa-star"></i>
        ) : (
          <i className="far fa-star"></i>
        )}{" "}
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

FavoriteButton.propTypes = {
  auth: PropTypes.object,
  handleBookmarkCallback: PropTypes.func,
  gamesheet: PropTypes.object,
};

export default connect(mapStateToProps, null)(RequireAuth(FavoriteButton));
