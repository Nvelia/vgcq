import { requests } from "../utils/agent";
import {
  IMAGE_UPLOADED,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UNLOAD,
  IMAGE_DELETE_REQUEST,
  AVATAR_UPLOADED,
  AVATAR_REQUEST,
} from "./types";

export const imageUploaded = (data) => {
  return {
    type: IMAGE_UPLOADED,
    data: data,
  };
};

export const imageUploadRequest = () => {
  return {
    type: IMAGE_UPLOAD_REQUEST,
  };
};

export const imageUnload = () => {
  return {
    type: IMAGE_UNLOAD,
  };
};

export const imageUploadError = () => {
  return {
    type: IMAGE_UPLOAD_ERROR,
  };
};

export const gameSheetImageUpload = (file) => {
  return (dispatch) => {
    dispatch(imageUploadRequest());
    return requests
      .upload("/images", file)
      .then((response) => dispatch(imageUploaded(response)))
      .catch(() => dispatch(imageUploadError));
  };
};

export const avatarUploaded = (data) => {
  return {
    type: AVATAR_UPLOADED,
    data: data,
  };
};

export const avatarRequest = () => {
  return {
    type: AVATAR_REQUEST,
  };
};

export const avatarUpload = (file) => {
  return (dispatch) => {
    dispatch(avatarRequest());
    return requests
      .upload("/avatars", file)
      .then((response) => dispatch(avatarUploaded(response)))
      .catch(() => dispatch(imageUploadError));
  };
};

export const imageDeleteRequest = () => {
  return {
    type: IMAGE_DELETE_REQUEST,
  };
};

export const imageDelete = (id) => {
  return (dispatch) => {
    dispatch(imageDeleteRequest());
    return requests
      .delete(`/images/${id}`)
      .then(() => dispatch(imageUnload()))
      .catch((error) => console.log(error));
  };
};

export const avatarDelete = (id) => {
  return (dispatch) => {
    return requests
      .delete(`/avatars/${id}`)
      .then(() => dispatch(imageUnload()))
      .catch((error) => console.log(error));
  };
};
