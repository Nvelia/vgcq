import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { deleteFlashMessage } from "../../actions/flashMessageActions";

class FlashMessage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
    };
  }

  componentDidMount() {
    this.deleteFlashTag();
  }

  componentDidUpdate() {
    this.deleteFlashTag();
  }

  deleteFlashTag = () => {
    if (this.state.message !== null) {
      setTimeout(() => {
        this.props.deleteFlashMessage();
      }, 3000);
    }
  };

  static getDerivedStateFromProps(props, state) {
    let message = null;
    if (props.messages.length !== 0 && state.message !== props.messages) {
      console.log(props);
      if (props.messages[0].text === "gamesheetEditText") {
        message = {
          type: "success",
          text: props.t("gamesheet-form.flash-edit-success"),
        };
      } else if (props.messages[0].text === "cardEditText") {
        message = {
          type: "success",
          text: props.t("card-form.flash-edit-success"),
        };
      } else if (props.messages[0].text === "cardAddText") {
        message = {
          type: "success",
          text: props.t("card-form.flash-add-success"),
        };
      } else if (props.messages[0].text === "gamesheetAddText") {
        message = {
          type: "success",
          text: props.t("gamesheet-form.flash-add-success"),
        };
      } else {
        message = props.messages[0];
      }
    }

    return { message };
  }

  onClick = () => {
    this.props.deleteFlashMessage();
  };

  render() {
    return (
      <div>
        {this.state.message ? (
          <div
            className={classnames("flash-message", {
              "flash-message-success": this.state.message.type === "success",
              "flash-message-warning": this.state.message.type === "warning",
              "flash-message-danger": this.state.message.type === "error",
            })}
          >
            <button onClick={this.onClick} className="close-flash-message">
              &times;
            </button>
            {this.state.message.text}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.flashMessages,
  };
};

FlashMessage.propTypes = {
  messages: PropTypes.array,
  deleteFlashMessage: PropTypes.func,
};

export default connect(mapStateToProps, { deleteFlashMessage })(
  withTranslation()(FlashMessage)
);
