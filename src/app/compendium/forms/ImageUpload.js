import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  gameSheetImageUpload,
  avatarUpload,
} from "../../../actions/imageActions";

class ImageUpload extends Component {
  onChange = (e) => {
    const file = e.target.files[0];

    if (this.props.avatar) {
      this.props.avatarUpload(file);
    } else {
      this.props.gameSheetImageUpload(file);
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className="form-group upload-file">
        <input
          onChange={this.onChange}
          type="file"
          className="form-control-file"
          data-title={t("image-upload.input-title")}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  gameSheetImageUpload,
  avatarUpload,
};

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  gameSheetImageUpload: PropTypes.func,
  avatarUpload: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(ImageUpload));
