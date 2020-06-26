import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
//import createRootReducer from "./reducers";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { tokenMiddleware } from "./utils/middleware";
export const history = createBrowserHistory();

const middlewares = [routerMiddleware(history), thunk, tokenMiddleware];
const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(...middlewares))
// );

const devTools =
  process.env.NODE_ENV === "production"
    ? composeEnhancers(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

const store = createStore(rootReducer, initialState, devTools);

export default store;
