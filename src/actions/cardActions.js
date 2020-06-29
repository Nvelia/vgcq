import {
  RANDOM_CARD_RECEIVED,
  RANDOM_CARD_ERROR,
  RANDOM_CARD_UNLOAD,
  CARDS_REQUEST,
  CARDS_RECEIVED,
  CARDS_ERROR,
  CARDS_UNLOAD,
  CARDS_SEARCH_REQUEST,
  CARDS_SEARCH_RECEIVED,
  CARDS_SEARCH_ERROR,
  CARDS_SEARCH_UNLOAD,
  LIKES_UPDATED,
  CARDS_VALIDATION_UPDATE,
  CARDS_DELETE_UPDATE,
  CARD_EDIT,
  SENDING_CARD,
  SENDING_CARD_END,
} from "./types";
import { SubmissionError } from "redux-form";
import { requests } from "./../utils/agent";
import { parseApiErrors } from "./../utils/apiUtils";
import { userLogout } from "./authActions";
import { addFlashMessage } from "./flashMessageActions";

/**
 * Récupération random card
 */

export const randomCardReceived = (data) => ({
  type: RANDOM_CARD_RECEIVED,
  data,
});

export const randomCardError = (error) => ({
  type: RANDOM_CARD_ERROR,
  error,
});

export const randomCardUnload = () => ({
  type: RANDOM_CARD_UNLOAD,
});

export const getRandomCard = () => {
  return (dispatch) => {
    dispatch(cardsRequest());
    return requests
      .get(`/cards/random-card`)
      .then((response) => dispatch(randomCardReceived(response)))
      .catch((error) => dispatch(randomCardError(error)));
  };
};

/**
 * Récupération des cards
 */

export const cardsRequest = (page) => ({
  type: CARDS_REQUEST,
  page,
});

export const cardsReceived = (data, page, loadMore) => ({
  type: CARDS_RECEIVED,
  data,
  page,
  loadMore,
});

export const cardsError = (error) => ({
  type: CARDS_ERROR,
  error,
});

export const cardsUnload = () => ({
  type: CARDS_UNLOAD,
});

export const getCards = (slug, sorting, page = 1) => {
  return (dispatch) => {
    dispatch(cardsRequest(page));
    if (sorting === "less-popular") {
      return requests
        .get(
          `/cards?Gamesheet.slug=${slug}&published=1&order[likes]=asc&page=${page}`
        )
        .then((response) => dispatch(cardsReceived(response, page)))
        .catch((error) => dispatch(cardsError(error)));
    } else {
      return requests
        .get(
          `/cards?Gamesheet.slug=${slug}&published=1&order[likes]=desc&page=${page}`
        )
        .then((response) => dispatch(cardsReceived(response, page)))
        .catch((error) => dispatch(cardsError(error)));
    }
  };
};

/**
 * Recherche des cards
 */

export const cardsSearchRequest = () => ({
  type: CARDS_SEARCH_REQUEST,
});

export const cardsSearchReceived = (data) => ({
  type: CARDS_SEARCH_RECEIVED,
  data,
});

export const cardsSearchError = (error) => ({
  type: CARDS_SEARCH_ERROR,
  error,
});

export const cardsSearchUnload = () => ({
  type: CARDS_SEARCH_UNLOAD,
});

export const searchCards = (searchTags, slug) => {
  return (dispatch) => {
    dispatch(cardsSearchRequest());
    return requests
      .get(`/cards?Gamesheet.slug=${slug}&content=${searchTags}`)
      .then((response) => dispatch(cardsSearchReceived(response)))
      .catch((error) => dispatch(cardsSearchError(error)));
  };
};

/**
 * Ajout d'une card sur une fiche
 */

export const sendingCard = () => ({
  type: SENDING_CARD,
});

export const sendingCardEnd = () => ({
  type: SENDING_CARD_END,
});

export const cardAdd = (card) => {
  return (dispatch) => {
    dispatch(sendingCard());
    return requests
      .post("/cards", card)
      .then(() => {
        dispatch(
          addFlashMessage({
            type: "success",
            text: "cardAddText",
          })
        );
        dispatch(sendingCardEnd());
      })
      .catch((error) => {
        dispatch(sendingCardEnd());
        if (error.response.status === 401) {
          dispatch(userLogout());
        }
        throw new SubmissionError(parseApiErrors(error));
      });
  };
};

/**
 * Edition d'une card depuis la page validation
 */

export const cardEdited = (data) => ({
  type: CARD_EDIT,
  data,
});

export const cardEdit = (cardId, value) => {
  return (dispatch) => {
    dispatch(sendingCard());
    return requests
      .put(`/cards/${cardId}`, value)
      .then(() => {
        dispatch(
          addFlashMessage({
            type: "success",
            text: "cardEditText",
          })
        );
        dispatch(cardEdited(cardId));
      })
      .catch((error) => {
        dispatch(sendingCardEnd());
        if (error.response.status === 401) {
          dispatch(userLogout());
        }
        throw new SubmissionError(parseApiErrors(error));
      });
  };
};

/**
 * Votes sur cards
 */

export const likesUpdated = (data) => ({
  type: LIKES_UPDATED,
  data,
});

export const likeCard = (card, userId) => {
  let cardLiked = card.likes.find(
    (like) => parseInt(like) === parseInt(userId)
  );
  let likes = card.likes;

  if (cardLiked) {
    var newLikes = likes.filter((like) => {
      if (parseInt(like) !== parseInt(userId)) {
        return like;
      }
      return null;
    });

    likes = newLikes;
  } else {
    likes.push(userId);
  }

  return (dispatch) => {
    return requests
      .put(`/cards/${card.id}`, { likes })
      .then((response) => dispatch(likesUpdated(response)))
      .catch((error) => dispatch(cardsError(error)));
  };
};

export const getUnpublishedCards = (page = 1) => {
  return (dispatch) => {
    dispatch(cardsRequest(page));
    return requests
      .get("/cards/unpublished?published=0", true)
      .then((response) => dispatch(cardsReceived(response, page)))
      .catch((error) => dispatch(cardsError(error)));
  };
};

/**
 * Validation d'une card par l'intermédiaire de la modération
 */

export const cardsValidateUpdate = (data) => ({
  type: CARDS_VALIDATION_UPDATE,
  data,
});

export const validateCard = (cardId) => {
  return (dispatch) => {
    return requests
      .put(`/cards/${cardId}`, { published: true })
      .then(dispatch(cardsValidateUpdate(cardId)))
      .catch((error) => dispatch(cardsError(error)));
  };
};

/**
 * Suppression d'une card par l'intermédiaire de la modération
 */

export const cardsDeleteUpdate = (data) => ({
  type: CARDS_DELETE_UPDATE,
  data,
});

export const deleteCard = (cardId) => {
  return (dispatch) => {
    return requests
      .delete(`/cards/${cardId}`)
      .then(dispatch(cardsDeleteUpdate(cardId)))
      .catch((error) => dispatch(cardsError(error)));
  };
};
