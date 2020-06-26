import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import { SERVER_ROOT } from "./../../utils/agent";

const ImageBrowser = (props) => {
  const { image, fromAvatar, t, imageDelete, avatarDelete } = this.props;

  function deleteOnClick(e) {
    e.preventDefault();
    if (fromAvatar) {
      avatarDelete(image.avatar.id);
    } else {
      imageDelete(image.data.id);
    }
  }

  return (
    (image.data || image.avatar) && (
      <div className="image-container">
        <div className="image-preview">
          {fromAvatar ? (
            <img
              src={`${SERVER_ROOT}${image.avatar.url}`}
              alt="avatar en cours d'upload"
              className="img-fluid"
            />
          ) : (
            <img
              src={`${SERVER_ROOT}${image.data.url}`}
              className="img-fluid"
              alt="icone en cours d'upload"
            />
          )}
        </div>
        <div className="image-delete-btn">
          <button
            type="button"
            onClick={deleteOnClick}
            disabled={image.reqInProgress}
          >
            {t("image-browser.delete-button")}
          </button>
        </div>
      </div>
    )
  );
};

ImageBrowser.propTypes = {
  image: PropTypes.object,
  fromAvatar: PropTypes.bool,
  imageDelete: PropTypes.func,
  avaterDelete: PropTypes.func,
};

export default withTranslation()(ImageBrowser);
