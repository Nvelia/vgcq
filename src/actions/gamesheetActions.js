import {
  GAMESHEET_LIST_REQUEST,
  GAMESHEET_LIST_RECEIVED,
  GAMESHEET_LIST_ERROR,
  GAMESHEET_LIST_UNLOAD,
  GAMESHEET_SEARCH_REQUEST,
  GAMESHEET_SEARCH_RECEIVED,
  GAMESHEET_SEARCH_ERROR,
  SEARCH_UNLOAD,
  GAMESHEET_REQUEST,
  GAMESHEET_RECEIVED,
  GAMESHEET_ERROR,
  GAMESHEET_UNLOAD,
  UNPUBLISHED_GAMESHEETS_RECEIVED,
  UNPUBLISHED_GAMESHEETS_ERROR,
  GAMESHEET_VALIDATION_UPDATE,
  GAMESHEET_DELETE_UPDATE,
  GAMESHEET_EDIT,
  UNPUBLISHED_GAMESHEETS_REQUEST,
  UNPUBLISHED_GAMESHEETS_UNLOAD,
  SENDING_GAMESHEET,
  SENDING_GAMESHEET_END,
} from "./types";
import { requests } from "../utils/agent";
import { userLogout } from "./authActions";
import { SubmissionError } from "redux-form";
import { parseApiErrors } from "../utils/apiUtils";
import { addFlashMessage } from "./flashMessageActions";

/**
 * Fetching all gamesheets
 */
export const gamesheetListRequest = (page) => ({
  type: GAMESHEET_LIST_REQUEST,
  page,
});

export const gamesheetListReceived = (data, page) => ({
  type: GAMESHEET_LIST_RECEIVED,
  data,
  page,
});

export const gamesheetListError = (error) => ({
  type: GAMESHEET_LIST_ERROR,
  error,
});

export const gamesheetListUnload = () => ({
  type: GAMESHEET_LIST_UNLOAD,
});

export const fetchGamesheetList = (sorting, page = 1) => {
  return (dispatch) => {
    dispatch(gamesheetListRequest(page));
    if (sorting === "less-popular") {
      return requests
        .get(`/gamesheets?published=1&order[cardsQty]=asc&page=${page}`)
        .then((response) => dispatch(gamesheetListReceived(response, page)))
        .catch((error) => dispatch(gamesheetListError(error)));
    } else {
      return requests
        .get(`/gamesheets?published=1&order[cardsQty]=desc&page=${page}`)
        .then((response) => dispatch(gamesheetListReceived(response, page)))
        .catch((error) => dispatch(gamesheetListError(error)));
    }
  };
};

export const getUnpublishedGamesheets = (page = 1) => {
  return (dispatch) => {
    dispatch(gamesheetListRequest(page));
    return requests
      .get("/gamesheets/unpublished?published=0", true)
      .then((response) => dispatch(gamesheetListReceived(response, page)))
      .catch((error) => dispatch(gamesheetListError(error)));
  };
};

/**
 * Recherche de fiche
 */

export const gamesheetSearchRequest = () => ({
  type: GAMESHEET_SEARCH_REQUEST,
});

export const gamesheetSearchReceived = (data) => ({
  type: GAMESHEET_SEARCH_RECEIVED,
  data,
});

export const gamesheetSearchError = (error) => ({
  type: GAMESHEET_SEARCH_ERROR,
  error,
});

export const searchUnload = () => ({
  type: SEARCH_UNLOAD,
});

export const searchGamesheet = (searchTags) => {
  return (dispatch) => {
    dispatch(gamesheetSearchRequest());
    return requests
      .get(`/gamesheets?name=${searchTags}`)
      .then((response) => dispatch(gamesheetSearchReceived(response)))
      .catch((error) => dispatch(gamesheetSearchError(error)));
  };
};

/**
 * Récupération d'une fiche
 */

export const gamesheetRequest = () => ({
  type: GAMESHEET_REQUEST,
});

export const gamesheetReceived = (data) => ({
  type: GAMESHEET_RECEIVED,
  data,
});

export const gamesheetError = (error) => ({
  type: GAMESHEET_ERROR,
  error,
});

export const gamesheetUnload = () => ({
  type: GAMESHEET_UNLOAD,
});

export const fetchGamesheet = (slug) => {
  return (dispatch) => {
    dispatch(gamesheetRequest());
    return requests
      .get(`/gamesheets/${slug}`)
      .then((response) => dispatch(gamesheetReceived(response)))
      .catch((error) => dispatch(gamesheetError(error)));
  };
};

/**
 * Ajout d'une fiche
 */

export const sendingGamesheet = () => ({
  type: SENDING_GAMESHEET,
});

export const sendingGamesheetEnd = () => ({
  type: SENDING_GAMESHEET_END,
});

export const gamesheetAdd = (gamesheet) => {
  return (dispatch) => {
    dispatch(sendingGamesheet());
    return requests
      .post("/gamesheets", gamesheet)
      .then(() => {
        dispatch(
          addFlashMessage({
            type: "success",
            text: "gamesheetAddText",
          })
        );
        dispatch(sendingGamesheetEnd());
      })
      .catch((error) => {
        dispatch(sendingGamesheetEnd());
        if (error.response.stats === 401) {
          return dispatch(userLogout());
        }
        throw new SubmissionError(parseApiErrors(error));
      });
  };
};

/**
 * Récupération des fiches non publiées
 */

export const unpublishedGameSheetsRequest = () => ({
  type: UNPUBLISHED_GAMESHEETS_REQUEST,
});

export const unpublishedGameSheetsReceived = (data) => ({
  type: UNPUBLISHED_GAMESHEETS_RECEIVED,
  data,
});

export const unpublishedGameSheetsError = (error) => ({
  type: UNPUBLISHED_GAMESHEETS_ERROR,
  error,
});

export const unpublishedGameSheetsUnload = () => ({
  type: UNPUBLISHED_GAMESHEETS_UNLOAD,
});

export const getUnpublishedGameSheets = () => {
  return (dispatch) => {
    dispatch(unpublishedGameSheetsRequest());
    return requests
      .get("/gamesheets/unpublished-gamesheets", true)
      .then((response) => dispatch(unpublishedGameSheetsReceived(response)))
      .catch((error) => dispatch(unpublishedGameSheetsError(error)));
  };
};

/**
 * Validation d'une fiche
 */

export const gamesheetValidateUpdate = (data) => ({
  type: GAMESHEET_VALIDATION_UPDATE,
  data,
});

export const validateGamesheet = (gamesheetId) => {
  return (dispatch) => {
    return requests
      .put(`/gamesheets/${gamesheetId}`, { published: true })
      .then(dispatch(gamesheetValidateUpdate(gamesheetId)))
      .catch((error) => dispatch(gamesheetError(error)));
  };
};

/**
 * Suppression d'une fiche
 */

export const gamesheetDeleteUpdate = (data) => ({
  type: GAMESHEET_DELETE_UPDATE,
  data,
});

export const deleteGamesheet = (gamesheetId) => {
  return (dispatch) => {
    return requests
      .delete(`/gamesheets/${gamesheetId}`)
      .then(dispatch(gamesheetDeleteUpdate(gamesheetId)))
      .catch((error) => dispatch(gamesheetError(error)));
  };
};

/**
 * Edition d'une fiche depuis la page validation
 */

export const gamesheetEdited = (data) => ({
  type: GAMESHEET_EDIT,
  data,
});

export const gamesheetEdit = (gamesheetId, value) => {
  return (dispatch) => {
    dispatch(sendingGamesheet());
    return requests
      .put(`/gamesheets/${gamesheetId}`, value)
      .then(() => {
        dispatch(gamesheetEdited(gamesheetId));
        dispatch(
          addFlashMessage({
            type: "success",
            text: "gamesheetEditText",
          })
        );
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(userLogout());
        }
        throw new SubmissionError(parseApiErrors(error));
      });
  };
};
