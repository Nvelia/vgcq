import React, { Component } from "react";

import GamesheetsContainer from "./GamesheetsContainer";
import SearchGamesheetForm from "./forms/SearchGamesheetForm";
import RandomCard from "./RandomCard";

class MainPageContainer extends Component {
  render() {
    return (
      <div>
        <div className="background-shape"></div>
        <RandomCard />
        <SearchGamesheetForm page="main" />
        <GamesheetsContainer />
      </div>
    );
  }
}

export default MainPageContainer;
