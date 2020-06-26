import {
  GAMESHEET_LIST_REQUEST,
  GAMESHEET_LIST_RECEIVED,
  GAMESHEET_LIST_ERROR,
  GAMESHEET_LIST_UNLOAD,
  GAMESHEET_SEARCH_REQUEST,
  GAMESHEET_SEARCH_RECEIVED,
  GAMESHEET_SEARCH_ERROR,
  SEARCH_UNLOAD,
  GAMESHEET_ERROR,
  GAMESHEET_REQUEST,
  GAMESHEET_RECEIVED,
  GAMESHEET_UNLOAD,
  GAMESHEET_DELETE_UPDATE,
  GAMESHEET_EDIT,
  GAMESHEET_VALIDATION_UPDATE,
  SENDING_GAMESHEET_END,
  SENDING_GAMESHEET,
} from "../actions/types";

import { hydraPageCount } from "./../utils/apiUtils";

const initialState = {
  list: null,
  currentPage: 1,
  pageCount: null,
  data: null,
  isFetching: false,
  suggestions: null,
  isSearching: false,
  posting: false,
};

export default function gamesheetReducer(state = initialState, action) {
  switch (action.type) {
    case GAMESHEET_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        currentPage: action.page === 1 ? 1 : state.currentPage,
      };

    case GAMESHEET_LIST_RECEIVED:
      return {
        ...state,
        list:
          !state.list || action.page === 1
            ? action.data["hydra:member"]
            : state.list.concat(action.data["hydra:member"]),
        isFetching: false,
        currentPage: state.currentPage + 1,
        pageCount: hydraPageCount(action.data),
      };

    case GAMESHEET_DELETE_UPDATE:
    case GAMESHEET_EDIT:
    case GAMESHEET_VALIDATION_UPDATE:
      return {
        ...state,
        posting: false,
        list: state.list.filter((gamesheet) => {
          if (gamesheet.slug !== action.data) {
            return gamesheet;
          }
          return 0;
        }),
      };

    case GAMESHEET_LIST_ERROR:
    case GAMESHEET_LIST_UNLOAD:
      return initialState;

    case GAMESHEET_SEARCH_REQUEST:
      return {
        ...state,
        isSearching: true,
      };

    case GAMESHEET_SEARCH_RECEIVED:
      return {
        ...state,
        isSearching: false,
        suggestions: action.data["hydra:member"],
      };

    case GAMESHEET_SEARCH_ERROR:
    case SEARCH_UNLOAD:
      return {
        ...state,
        isSearching: false,
        suggestions: null,
      };

    case GAMESHEET_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case GAMESHEET_RECEIVED:
      return {
        ...state,
        data: action.data,
        isFetching: false,
      };

    case GAMESHEET_ERROR:
    case GAMESHEET_UNLOAD:
      return {
        ...state,
        data: null,
        isFetching: false,
      };

    case SENDING_GAMESHEET:
      return {
        ...state,
        posting: true,
      };

    case SENDING_GAMESHEET_END:
      return {
        ...state,
        posting: false,
      };

    default:
      return state;
  }
}
