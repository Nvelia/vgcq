import React, { Component } from "react";
import classNames from "classnames";

export class renderField extends Component {
  state = {
    myInputValue: this.props.predefinedText,
  };

  render() {
    const {
      input,
      label,
      placeholder,
      type,
      searchBar,
      meta: { error },
    } = this.props;

    const { myInputValue } = this.state;

    const classes = classNames("form-control", {
      "is-invalid": error,
    });

    return (
      <div className={searchBar ? "search-input" : "form-group"}>
        {label !== null && label !== "" && <label>{label}</label>}
        {type !== "textarea" && myInputValue && (
          <input
            {...input}
            value={myInputValue}
            type={type}
            onChange={(e) => this.setState({ myInputValue: e.target.value })}
            className={searchBar ? "search-input" : classes}
            placeholder={placeholder !== null && placeholder}
          />
        )}
        {type !== "textarea" && !myInputValue && (
          <input
            {...input}
            type={type}
            className={searchBar ? "search-input" : classes}
            placeholder={placeholder !== null && placeholder}
          />
        )}
        {type === "textarea" && myInputValue && (
          <textarea
            {...input}
            onChange={(e) => this.setState({ myInputValue: e.target.value })}
            type={type}
            className="textarea"
            value={myInputValue}
          />
        )}
        {type === "textarea" && !myInputValue && (
          <textarea {...input} type={type} className="textarea" />
        )}
        {error && <small className="form-text text-danger">{error}</small>}
      </div>
    );
  }
}
