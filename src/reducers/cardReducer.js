import {
  CARDS_RECEIVED,
  CARDS_REQUEST,
  CARDS_ERROR,
  CARDS_UNLOAD,
  CARDS_SEARCH_REQUEST,
  CARDS_SEARCH_RECEIVED,
  CARDS_SEARCH_ERROR,
  CARDS_SEARCH_UNLOAD,
  LIKES_UPDATED,
  RANDOM_CARD_RECEIVED,
  RANDOM_CARD_ERROR,
  RANDOM_CARD_UNLOAD,
  CARDS_DELETE_UPDATE,
  CARDS_VALIDATION_UPDATE,
  CARD_EDIT,
  SENDING_CARD_END,
  SENDING_CARD,
} from "../actions/types";

import { hydraPageCount } from "./../utils/apiUtils";

export default function cardReducer(
  state = {
    list: null,
    isFetching: false,
    suggestions: null,
    isSearching: false,
    currentPage: 1,
    pageCount: null,
    randomCard: null,
    posting: false,
  },
  action
) {
  switch (action.type) {
    case RANDOM_CARD_RECEIVED:
      return {
        ...state,
        isFetching: false,
        randomCard: action.data,
      };

    case RANDOM_CARD_ERROR:
    case RANDOM_CARD_UNLOAD:
      return {
        ...state,
        isFetching: false,
        randomCard: null,
      };

    case CARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        currentPage: action.page === 1 ? 1 : state.currentPage,
      };

    case CARDS_RECEIVED:
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

    case CARDS_VALIDATION_UPDATE:
    case CARDS_DELETE_UPDATE:
    case CARD_EDIT:
      return {
        ...state,
        posting: false,
        list: state.list.filter((card) => {
          if (card.id !== action.data) {
            return card;
          }
          return 0;
        }),
      };

    case CARDS_ERROR:
    case CARDS_UNLOAD:
      return {
        ...state,
        list: null,
        isFetching: false,
        suggestions: null,
        isSearching: false,
        currentPage: 1,
        pageCount: null,
      };

    case CARDS_SEARCH_REQUEST:
      return {
        ...state,
        isSearching: true,
        suggestions: null,
      };

    case CARDS_SEARCH_RECEIVED:
      return {
        ...state,
        isSearching: false,
        suggestions: action.data["hydra:member"],
      };

    case SENDING_CARD:
      return {
        ...state,
        posting: true,
      };

    case SENDING_CARD_END:
      return {
        ...state,
        posting: false,
      };

    case CARDS_SEARCH_ERROR:
    case CARDS_SEARCH_UNLOAD:
      return {
        ...state,
        suggestions: null,
        isSearching: false,
      };

    case LIKES_UPDATED:
      let list = state.list && [...state.list];
      var randomCard = state.randomCard && Object.assign({}, state.randomCard);

      if (randomCard && randomCard.id === action.data.id) {
        randomCard.likes = action.data.likes;
      } else {
        list.map((card) => {
          if (card.id === action.data.id) {
            card.likes = action.data.likes;
          }
          return card;
        });
      }

      return {
        ...state,
        list: list,
        randomCard: randomCard,
      };

    default:
      return state;
  }
}
