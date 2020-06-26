import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_ERROR,
  RESET_PASSWORD_SUCCESS,
} from "../actions/types";
import { requests } from "./agent";
import { userLogout } from "../actions/authActions";

export const tokenMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      window.localStorage.setItem("jwtToken", action.token);
      window.localStorage.setItem("userId", action.userId);
      requests.setToken(action.token);
      break;
    case RESET_PASSWORD_SUCCESS:
      window.localStorage.removeItem("jwtToken");
      window.localStorage.setItem("jwtToken", action.token);
      requests.setToken(action.token);
      break;
    case USER_LOGOUT:
      window.localStorage.removeItem("jwtToken");
      window.localStorage.removeItem("userId");
      requests.setToken(null);
      break;
    case USER_PROFILE_ERROR:
      window.localStorage.removeItem("jwtToken");
      window.localStorage.removeItem("userId");
      const state = store.getState().auth;
      if (state.userId === action.userId && state.userData === null) {
        store.dispatch(userLogout());
      }
      break;
    default:
  }

  next(action);
};
