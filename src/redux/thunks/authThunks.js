import axiosInstance from "../../api/axiosInstance";

import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from "../slices/authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axiosInstance.post(
      "/auth/login",
      credentials
    );

    dispatch(loginSuccess(response.data.user));

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed";

    dispatch(loginFailure(message));
    throw error;
  }
};

export const registerUser =
  (userData) => async () => {
    try {
      const response =
        await axiosInstance.post(
          "/auth/register",
          userData
        );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const logoutUser =
  () => async (dispatch) => {
    try {
      await axiosInstance.post(
        "/auth/logout"
      );

      dispatch(logoutSuccess());
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    }
  };

export const getCurrentUser =
  () => async (dispatch) => {
    try {
      const response =
        await axiosInstance.get(
          "/users/profile"
        );

      dispatch(
        loginSuccess(response.data)
      );

      return response.data;
    } catch (error) {
      dispatch(logoutSuccess());
      return null;
    }
  };