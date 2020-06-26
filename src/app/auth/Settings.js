import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
// import { ChromePicker } from "react-color";

import ChangePasswordForm from "./../forms/ChangePasswordForm";
import UpdateAvatarForm from "../compendium/forms/UpdateAvatarForm";

class Settings extends Component {
  state = {
    primary: "#c25165",
  };

  handleChange = (color) => {
    this.setState({ primary: color.hex });
  };

  render() {
    const { t } = this.props;
    return (
      <div className="settings-window">
        <div>
          <h6>{t("settings.profil-picture")}</h6>
          <UpdateAvatarForm userId={this.props.auth.userId} />
        </div>
        <div>
          <h6>{t("settings.password")}</h6>
          <ChangePasswordForm />
        </div>
        {/* <div>
          <h6>Modification de la couleur principale du thème</h6>
          <ChromePicker
            color={this.state.primary}
            onChange={this.handleChange}
          />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

Settings.propTypes = {
  auth: PropTypes.object,
};

export default connect(mapStateToProps, null)(withTranslation()(Settings));
