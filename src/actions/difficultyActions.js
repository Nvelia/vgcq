/**
 * Récupération de la liste des difficultés pour l'affichager dans le tableau de personnalisation de Quizz
 */

import {
  DIFFICULTIES_ERROR,
  DIFFICULTIES_RECEIVED,
  DIFFICULTIES_UNLOAD
} from "./types";
import { requests } from "../utils/agent";

export const difficultyListReceived = data => ({
  type: DIFFICULTIES_RECEIVED,
  data
});

export const difficultyListError = error => ({
  type: DIFFICULTIES_ERROR,
  error
});

export const difficultyListUnload = () => ({
  type: DIFFICULTIES_UNLOAD
});

export const fetchDifficulties = () => {
  return dispatch => {
    return requests
      .get("/difficulties")
      .then(response => dispatch(difficultyListReceived(response)))
      .catch(error => dispatch(difficultyListError(error)));
  };
};
