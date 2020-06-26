import {
  SET_MODAL_STATE,
  MODAL_UNLOAD,
  OPEN_GAMESHEET_FORM,
  OPEN_CARD_FORM,
} from "../actions/types";

export default function modalReducer(
  state = {
    loginFormOpened: false,
    page: null,
    cardFormOpened: false,
    gamesheetFormOpened: false,
    cardToEdit: null,
    gamesheetToEdit: null,
  },
  action
) {
  switch (action.type) {
    case SET_MODAL_STATE:
      return {
        ...state,
        loginFormOpened: action.data.opened,
        page: action.data.page,
      };

    case MODAL_UNLOAD:
      return {
        ...state,
        loginFormOpened: false,
        page: null,
        cardFormOpened: false,
        gamesheetFormOpened: false,
        cardToEdit: null,
      };

    case OPEN_CARD_FORM:
      return {
        ...state,
        cardFormOpened: action.opened,
        cardToEdit: action.card ? action.card : null,
      };

    case OPEN_GAMESHEET_FORM:
      return {
        ...state,
        gamesheetFormOpened: action.opened,
        gamesheetToEdit: action.gamesheet ? action.gamesheet : null,
      };
    default:
      return state;
  }
}
