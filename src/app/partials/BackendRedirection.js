import React, { Component } from "react";

class BackendRedirection extends Component {
  componentDidMount() {
    window.localStorage.setItem("jwtToken", this.props.match.params.token);
    window.localStorage.setItem("userId", this.props.match.params.id);
    return this.props.history.push("/compendium");
  }

  render() {
    return <div />;
  }
}

export default BackendRedirection;
