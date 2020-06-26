import { requests } from "../utils/agent";
import { SubmissionError } from "redux-form";
import { parseApiErrors } from "./../utils/apiUtils";
import { userLogout } from "./authActions";

export const quizEdit = (quizId, value) => {
  return (dispatch) => {
    return requests.put(`/quizzes/${quizId}`, value).catch((error) => {
      if (error.response.status === 401) {
        dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    });
  };
};

export const validateQuiz = (quizId) => {
  return (dispatch) => {
    return requests
      .put(`/quizzes/${quizId}`, { published: true })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(userLogout());
        }
        console.log(error);
      });
  };
};
