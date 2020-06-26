import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./app/App";
import "./i18n";

import * as serviceWorker from "./serviceWorker";

import store, { history } from "./configureStore";

/* eslint-disable no-unused-expressions */
import("./style/design.css");
/* eslint-disable no-unused-expressions */
import("./style/fontawesome/css/all.css");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App history={history} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
