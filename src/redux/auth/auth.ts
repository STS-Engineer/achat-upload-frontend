import { Dispatch } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { 
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  resetPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  meFailure,
  meRequest,
  meSuccess,
  uploadProfileImageRequest,
  uploadProfileImageSuccess,
  uploadProfileImageFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure
} from "./auth-slice";
import { Login, Me, ResetPassword, UpdateUser, UploadProfileImage } from "./auth-types";

export const login: Login = async (data, dispatch) => {
  dispatch(loginRequest());
  const url = `/auth/login`;

  try {
    await localStorage.clear();
    let response = await axiosInstance.post(url, data);
    dispatch(loginSuccess(response.data));
    return true;
  } catch (error: any) {
    const { status, data } = error.response;
    dispatch(loginFailure(data));
    if (status === 401) {
      logUserOut(dispatch);
    }
  }

  return false;
};

export const logUserOut = (dispatch: Dispatch) => {
  dispatch(logout());
};

export const resetPassword: ResetPassword = async (data, dispatch) => {
  dispatch(resetPasswordRequest());
  const url = `/auth/reset-password`;

  try {
    let response = await axiosInstance.post(url, data);
    dispatch(resetPasswordSuccess(response.data));
    return true;
  } catch (error: any) {
    const { status, data } = error.response;
    dispatch(resetPasswordFailure(data));
    if (status === 401) {
      logUserOut(dispatch);
    }
  }

  return false;
};

export const me: Me = async (dispatch) => {
  dispatch(meRequest());
  const url = `/auth/me`;

  try {
      let response = await axiosInstance.get(url);
      dispatch(meSuccess(response.data));
      return true;
    } catch (error: any) {
      const { status, data } = error.response;
      dispatch(meFailure(data));
      if (status === 401) {
        logUserOut(dispatch);
      }
    }

  return false;
};

export const uploadProfileImage: UploadProfileImage = async (user_id, formData, dispatch) => {
  dispatch(uploadProfileImageRequest());

  try {
    const response = await axiosInstance.put(`/user/${user_id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(uploadProfileImageSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(uploadProfileImageFailure(error.response?.data));
    return false;
  }
};

export const updateUser: UpdateUser = async (id, data, dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response = await axiosInstance.put(`/user/update/${id}`, data);

    dispatch(updateUserSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(updateUserFailure(error.response?.data));
    return false;
  }
};