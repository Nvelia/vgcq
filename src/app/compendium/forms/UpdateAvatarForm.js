import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import ImageUpload from "./ImageUpload";
import ImageBrowser from "../ImageBrowser";
import { addFlashMessage } from "../../../actions/flashMessageActions";
import { updateAvatar } from "../../../actions/authActions";
import { imageUnload, avatarDelete } from "../../../actions/imageActions";

class UpdateAvatarForm extends Component {
  onSubmit = (values) => {
    const {
      userId,
      reset,
      addFlashMessage,
      updateAvatar,
      image,
      t,
    } = this.props;

    if (image && image.avatar) {
      values.avatar = `/api/avatars/${image.avatar.id}`;
    }

    return updateAvatar(userId, values).then(() => {
      reset();
      addFlashMessage({
        type: "success",
        text: t("update-avatar-form.flash-success"),
      });
    });
  };

  render() {
    const { handleSubmit, image, avatarDelete, t } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ImageUpload avatar={true} />
          {image && (
            <ImageBrowser
              fromAvatar={true}
              image={image}
              avatarDelete={avatarDelete}
            />
          )}{" "}
          <button
            type="submit"
            className="sort-btn"
            disabled={image.reqInProgress}
          >
            {t("update-avatar-form.submit-button")}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.image,
});

const mapDispatchToProps = {
  imageUnload,
  addFlashMessage,
  updateAvatar,
  avatarDelete,
};

UpdateAvatarForm.propTypes = {
  userId: PropTypes.number,
  image: PropTypes.object,
  imageUnload: PropTypes.func,
  addFlashMessage: PropTypes.func,
  updateAvatar: PropTypes.func,
  avatarDelete: PropTypes.func,
};

export default reduxForm({ form: "UpdateAvatarForm" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(UpdateAvatarForm))
);
