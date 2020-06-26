/**
 * Actions pour affichage de la fenêtre de connexion / inscription
 */

import {
  SET_MODAL_STATE,
  MODAL_UNLOAD,
  OPEN_CARD_FORM,
  OPEN_GAMESHEET_FORM,
} from "./types";

export const modalUnload = () => ({
  type: MODAL_UNLOAD,
});

export const setModalState = (opened, page) => {
  return (dispatch) => {
    dispatch({
      type: SET_MODAL_STATE,
      data: { opened, page },
    });
  };
};

export const openCardForm = (opened, card) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_CARD_FORM,
      opened,
      card,
    });
  };
};

export const openGamesheetForm = (opened, gamesheet) => {
  return (dispatch) => {
    dispatch({
      type: OPEN_GAMESHEET_FORM,
      opened,
      gamesheet,
    });
  };
};
