import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOADED,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UNLOAD,
  IMAGE_DELETE_REQUEST,
  AVATAR_REQUEST,
  AVATAR_UPLOADED,
} from "./../actions/types";

export default function imageReducer(
  state = {
    reqInProgress: false,
    data: null,
    avatar: null,
  },
  action
) {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
    case IMAGE_DELETE_REQUEST:
    case AVATAR_REQUEST:
      return {
        ...state,
        reqInProgress: true,
        data: null,
        avatar: null,
      };

    case IMAGE_UPLOADED:
      return {
        ...state,
        reqInProgress: false,
        data: action.data,
      };

    case AVATAR_UPLOADED:
      return {
        ...state,
        reqInProgress: false,
        avatar: action.data,
      };

    case IMAGE_UPLOAD_ERROR:
    case IMAGE_UNLOAD:
      return {
        ...state,
        reqInProgress: false,
        data: null,
        avatar: null,
      };

    default:
      return state;
  }
}
