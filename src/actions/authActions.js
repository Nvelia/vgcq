import { SubmissionError } from "redux-form";
import { requests } from "./../utils/agent";
import { parseApiErrors } from "./../utils/apiUtils";
import { addFlashMessage } from "./flashMessageActions";
import {
  USER_GAMESHEETS_REQUEST,
  USER_GAMESHEETS_RECEIVED,
  USER_GAMESHEETS_ERROR,
  USER_GAMESHEETS_UNLOAD,
  USER_CARDS_REQUEST,
  USER_CARDS_RECEIVED,
  USER_CARDS_ERROR,
  USER_CARDS_UNLOAD,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RECEIVED,
  USER_PROFILE_ERROR,
  USER_SET_ID,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_CONFIRMATION_SUCCESS,
  USER_REGISTER_COMPLETE,
  BOOKMARKS_UPDATED,
  RESET_PASSWORD_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  LOGIN_ATTEMPT,
} from "./types";

export const userSetId = (userId) => {
  return {
    type: USER_SET_ID,
    userId,
  };
};

export const userProfileRequest = () => {
  return {
    type: USER_PROFILE_REQUEST,
  };
};

export const userProfileReceived = (userData, userId) => {
  return {
    type: USER_PROFILE_RECEIVED,
    userData,
    userId,
  };
};

export const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId,
  };
};

export const userProfileError = (userId) => {
  return {
    type: USER_PROFILE_ERROR,
    userId,
  };
};

export const loginAttempt = () => {
  return {
    type: LOGIN_ATTEMPT,
  };
};

export const userLoginAttempt = (username, password) => {
  return (dispatch) => {
    dispatch(loginAttempt());
    return requests
      .post("/login_check", { username, password }, false)
      .then((response) =>
        dispatch(userLoginSuccess(response.token, response.id))
      )
      .catch(() => {
        dispatch(userProfileError());
        throw new SubmissionError({
          _error: "Identifiant ou mot de passe incorrect.",
        });
      });
  };
};

export const userFetch = (userId) => {
  return (dispatch) => {
    dispatch(userProfileRequest());
    return requests
      .get(`/users/${userId}`, true)
      .then((response) => dispatch(userProfileReceived(response, userId)))
      .catch(() => dispatch(userProfileError(userId)));
  };
};

/**
 * User Registration
 */
export const userRegisterSuccess = () => {
  return {
    type: USER_REGISTER_SUCCESS,
  };
};

export const userRegistration = (values) => {
  console.log(values);
  return (dispatch) => {
    return requests
      .post("/users", values, false)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log("erreur");
        throw new SubmissionError(parseApiErrors(error));
      });
  };
};

export const userConfirmationSuccess = () => {
  return {
    type: USER_CONFIRMATION_SUCCESS,
  };
};

export const userRegisterComplete = () => {
  return {
    type: USER_REGISTER_COMPLETE,
  };
};

export const userConfirm = (confirmationToken) => {
  return (dispatch) => {
    return requests
      .post("/users/confirm", { confirmationToken }, false)
      .then(() => dispatch(userConfirmationSuccess()))
      .catch((error) => {
        console.log(error);
        throw new SubmissionError({ _error: "Le token est incorrect." });
      });
  };
};

/**
 * Logout
 */
export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

/**
 * Add bookmark
 */
export const bookmarksUpdated = (data) => {
  return {
    type: BOOKMARKS_UPDATED,
    data,
  };
};

export const addToBookmark = (user, gamesheetId) => {
  let bookmarked = user.bookmarks.find(
    (gamesheet) => gamesheet["@id"] === gamesheetId
  );

  let bookmarks = user.bookmarks.map((gamesheet) => {
    return gamesheet["@id"];
  });

  let addFavorite;

  if (bookmarked) {
    var newBookmarks = bookmarks.filter((gamesheet) => {
      if (gamesheet !== gamesheetId) {
        return gamesheet;
      }
      return null;
    });

    bookmarks = newBookmarks;
    addFavorite = false;
  } else {
    bookmarks.push(gamesheetId);
    addFavorite = true;
  }

  return (dispatch) => {
    return requests
      .put(`/users/${user.id}`, { bookmarks })
      .then((response) => {
        dispatch(
          addFlashMessage({
            type: addFavorite ? "success" : "warning",
            text: addFavorite ? "Favoris ajouté." : "Favoris supprimé.",
          })
        );
        dispatch(bookmarksUpdated(response));
      })
      .catch((error) => console.log(error));
  };
};

/**
 * Reseting password
 */
export const resetPasswordSuccess = (token, userId) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    token,
    userId,
  };
};

export const resetPassword = (userId, passwordData) => {
  return (dispatch) => {
    return requests
      .put(`/users/${userId}/reset-password`, passwordData)
      .then((response) =>
        dispatch(resetPasswordSuccess(response.token, userId))
      )
      .catch((error) => {
        throw new SubmissionError(parseApiErrors(error));
      });
  };
};

/**
 * Updating Avatar
 */
export const updateAvatarSuccess = (data) => {
  return {
    type: UPDATE_AVATAR_SUCCESS,
    data,
  };
};

export const updateAvatar = (userId, avatar) => {
  return (dispatch) => {
    return requests
      .put(`/users/${userId}`, avatar)
      .then((response) => dispatch(updateAvatarSuccess(response)))
      .catch((error) => console.log(error));
  };
};

/**
 * Get user gamesheets
 */
export const userGamesheetsRequest = (page) => ({
  type: USER_GAMESHEETS_REQUEST,
  page,
});

export const userGamesheetsReceived = (data, page) => ({
  type: USER_GAMESHEETS_RECEIVED,
  data,
  page,
});

export const userGamesheetsError = (error) => ({
  type: USER_GAMESHEETS_ERROR,
  error,
});

export const userGamesheetsUnload = () => ({
  type: USER_GAMESHEETS_UNLOAD,
});

export const getUserGamesheets = (userId, published, page = 1) => {
  return (dispatch) => {
    dispatch(userGamesheetsRequest(page));
    return requests
      .get(
        `/gamesheets?pagination=true&itemsPerPage=10&Author.id=${userId}&published=${published}&page=${page}`
      )
      .then((response) => dispatch(userGamesheetsReceived(response, page)))
      .catch((error) => dispatch(userGamesheetsError(error)));
  };
};

/**
 * Get user cards
 */
export const userCardsRequest = (page) => ({
  type: USER_CARDS_REQUEST,
  page,
});

export const userCardsReceived = (data, page) => ({
  type: USER_CARDS_RECEIVED,
  data,
  page,
});

export const userCardsError = (error) => ({
  type: USER_CARDS_ERROR,
  error,
});

export const userCardsUnload = () => ({
  type: USER_CARDS_UNLOAD,
});

export const getUserCards = (userId, published, page = 1) => {
  return (dispatch) => {
    dispatch(userCardsRequest(page));
    return requests
      .get(`/cards?Author.id=${userId}&published=${published}&page=${page}`)
      .then((response) => dispatch(userCardsReceived(response, page)))
      .catch((error) => dispatch(userCardsError(error)));
  };
};

export const addAnswer = (userId, cardsAnswered) => {
  return (dispatch) => {
    return requests
      .put(`/users/${userId}`, { cardsAnswered: cardsAnswered })
      .catch((error) => console.log(error));
  };
};
