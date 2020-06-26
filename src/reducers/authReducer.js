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
  USER_PROFILE_RECEIVED,
  USER_SET_ID,
  BOOKMARKS_UPDATED,
  USER_LOGOUT,
  RESET_PASSWORD_SUCCESS,
  USER_PROFILE_ERROR,
  LOGIN_ATTEMPT,
} from "./../actions/types";
import { hydraPageCount } from "../utils/apiUtils";

const initialState = {
  token: null,
  userId: null,
  isAuthenticated: false,
  isFetching: false,
  user: {
    data: null,
    gamesheets: null,
    cards: null,
    gamesheetsLoading: false,
    cardsLoading: false,
    gamesheetsPageCount: null,
    gamesheetsCurrentPage: 1,
    cardsPageCount: null,
    cardsCurrentPage: 1,
    bookmarksLoading: false,
  },
  userFetch: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_SET_ID:
      return {
        ...state,
        userId: action.userId,
        isAuthenticated: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        isAuthenticated: true,
        isFetching: false,
      };

    case LOGIN_ATTEMPT:
      return {
        ...state,
        isFetching: true,
      };

    case USER_PROFILE_RECEIVED:
      return {
        ...state,
        isFetching: false,
        user: {
          ...state.user,
          data:
            state.userId === action.userId && state.user.data === null
              ? action.userData
              : state.user.data,
        },
        isAuthenticated: true,
      };

    case BOOKMARKS_UPDATED:
      return {
        ...state,
        user: { ...state.user, data: action.data },
      };

    case USER_LOGOUT:
    case USER_PROFILE_ERROR:
      return initialState;

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        token: action.token,
      };

    case USER_GAMESHEETS_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          gamesheetsLoading: true,
          gamesheetsCurrentPage:
            action.page === 1 ? 1 : state.user.gamesheetsCurrentPage,
        },
      };

    case USER_GAMESHEETS_RECEIVED:
      return {
        ...state,
        user: {
          ...state.user,
          gamesheetsLoading: false,
          gamesheets:
            !state.user.gamesheets || action.page === 1
              ? action.data["hydra:member"]
              : state.user.gamesheets.concat(action.data["hydra:member"]),
          gamesheetsCurrentPage: state.user.gamesheetsCurrentPage + 1,
          gamesheetsPageCount: hydraPageCount(action.data),
        },
      };

    case USER_GAMESHEETS_ERROR:
    case USER_GAMESHEETS_UNLOAD:
    case USER_CARDS_ERROR:
    case USER_CARDS_UNLOAD:
      return {
        ...state,
        user: {
          ...state.user,
          gamesheetsLoading: false,
          gamesheets: null,
          gamesheetsCurrentPage: 1,
          gamesheetsPageCount: null,
          cardsLoading: false,
          cards: null,
          cardsPageCount: null,
          cardsCurrentPage: 1,
        },
      };

    case USER_CARDS_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          cardsLoading: true,
          cardsCurrentPage: action.page === 1 ? 1 : state.user.cardsCurrentPage,
        },
      };

    case USER_CARDS_RECEIVED:
      return {
        ...state,
        user: {
          ...state.user,
          cardsLoading: false,
          cards:
            !state.user.cards || action.page === 1
              ? action.data["hydra:member"]
              : state.user.cards.concat(action.data["hydra:member"]),
          cardsCurrentPage: state.user.cardsCurrentPage + 1,
          cardsPageCount: hydraPageCount(action.data),
        },
      };

    default:
      return state;
  }
}
