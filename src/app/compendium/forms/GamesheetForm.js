import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import ImageUpload from "./ImageUpload";
import Spinner from "./../../partials/Spinner";
import ImageBrowser from "./../../compendium/ImageBrowser";
import {
  gamesheetAdd,
  gamesheetEdit,
} from "./../../../actions/gamesheetActions";
import { renderField } from "./../../forms/form";
import { imageUnload, imageDelete } from "./../../../actions/imageActions";
import { modalUnload } from "../../../actions/modalActions";
import { submitGamesheet } from "../../../utils/functions";

class GamesheetForm extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
    this.props.imageUnload();
  }

  handleClick = (e) => {
    if (
      (this.node && this.node.contains(e.target)) ||
      e.target.className === "sort-btn add-gameSheet-btn"
    ) {
      return;
    }

    this.handleClickOutside();
  };

  handleClickOutside = () => {
    this.props.modalUnload();
  };

  onSubmit = (values) => {
    const { gamesheetAdd, image, gamesheet, gamesheetEdit } = this.props;

    return submitGamesheet(
      gamesheet && gamesheet,
      values,
      image && image,
      gamesheetEdit,
      gamesheetAdd
    ).then(() => this.handleClickOutside());
  };

  render() {
    const {
      handleSubmit,
      image,
      imageDelete,
      gamesheet,
      t,
      posting,
    } = this.props;

    return (
      <div className="gamesheet-form" ref={(node) => (this.node = node)}>
        <button className="close-btn" onClick={() => this.handleClickOutside()}>
          &times;
        </button>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            predefinedText={gamesheet && gamesheet.name}
            name="name"
            label={t("gamesheet-form.name-label")}
            type="input"
            component={renderField}
          />
          {gamesheet && (
            <Fragment>
              <ImageUpload />
              {image && (
                <ImageBrowser image={image} imageDelete={imageDelete} />
              )}
            </Fragment>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={image.reqInProgress}
          >
            {posting || image.reqInProgress ? (
              <Spinner />
            ) : (
              t("gamesheet-form.submit-button")
            )}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.image,
  gamesheet: state.modal.gamesheetToEdit,
  posting: state.gamesheets.posting,
});

const mapDispatchToProps = {
  modalUnload,
  gamesheetAdd,
  imageUnload,
  imageDelete,
  gamesheetEdit,
};

GamesheetForm.propTypes = {
  image: PropTypes.object,
  gamesheet: PropTypes.object,
  posting: PropTypes.bool,
  modalUnload: PropTypes.func,
  gamesheetAdd: PropTypes.func,
  imageUnload: PropTypes.func,
  imageDelete: PropTypes.func,
  gamesheetEdit: PropTypes.func,
};

export default reduxForm({
  form: "GamesheetForm",
})(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GamesheetForm))
);
