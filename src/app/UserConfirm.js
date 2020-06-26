import React, { Component } from "react";
import Message from "./partials/Message";
import { withTranslation } from "react-i18next";

class UserConfirm extends Component {
  componentDidMount() {
    var _this = this;
    setTimeout(function () {
      _this.props.history.push("/");
    }, 3000);
  }

  render() {
    const { t } = this.props;
    return <Message message={t("user-confirm.registered")} />;
  }
}

export default withTranslation()(UserConfirm);
