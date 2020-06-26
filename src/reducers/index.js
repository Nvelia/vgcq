import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import registrationReducer from "./registrationReducer";
import modalReducer from "./modalReducer";
import flashMessageReducer from "./flashMessagesReducer";
import imageReducer from "./imageReducer";
import gamesheetReducer from "./gamesheetReducer";
import cardReducer from "./cardReducer";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  form: formReducer,
  cards: cardReducer,
  gamesheets: gamesheetReducer,
  flashMessages: flashMessageReducer,
  image: imageReducer,
  registration: registrationReducer,
  modal: modalReducer,
});

export default rootReducer;
