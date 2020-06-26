import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GamesheetList from "./GamesheetList";
import SortingContainer from "./buttons/SortingContainer";
import LoadMore from "./buttons/LoadMore";
import {
  fetchGamesheetList,
  gamesheetListUnload,
} from "../../actions/gamesheetActions";

class GamesheetsContainer extends Component {
  state = {
    sorting: "most-popular",
  };

  componentDidMount() {
    const { fetchGamesheetList } = this.props;
    fetchGamesheetList(this.state.sorting, 1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sorting } = this.state;
    if (prevState.sorting !== sorting) {
      this.props.fetchGamesheetList(sorting, 1);
    }
  }

  componentWillUnmount() {
    this.props.gamesheetListUnload();
  }

  loadMoreGamesheets = () => {
    const { gamesheets, fetchGamesheetList } = this.props;
    fetchGamesheetList(this.state.sorting, gamesheets.currentPage);
  };

  render() {
    const { gamesheets, history } = this.props;

    const showLoadMore =
      gamesheets.pageCount > 1 &&
      gamesheets.currentPage <= gamesheets.pageCount;

    return (
      <div className="gamesheet-container">
        <SortingContainer
          sorting={this.state.sorting}
          updateSortingCallback={(sorting) =>
            this.setState({
              sorting: sorting,
            })
          }
        />

        <GamesheetList
          gamesheets={gamesheets.list && gamesheets.list}
          spinner={gamesheets.isFetching}
          currentPage={gamesheets.currentPage}
          history={history}
        />
        {showLoadMore && (
          <LoadMore
            currentPage={gamesheets.currentPage}
            disabled={gamesheets.isFetching}
            onClick={() => this.loadMoreGamesheets()}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gamesheets: state.gamesheets,
});

const mapDispatchToProps = {
  fetchGamesheetList,
  gamesheetListUnload,
};

GamesheetsContainer.propTypes = {
  gamesheets: PropTypes.object,
  fetchGamesheetList: PropTypes.func,
  gamesheetListUnload: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GamesheetsContainer));
