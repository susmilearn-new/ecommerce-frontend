import axiosInstance from "../../api/axiosInstance";

import {
  ordersStart,
  ordersSuccess,
  ordersFailure,
} from "../slices/orderSlice";

export const createOrder = (orderData) => async () => {
  try {
    const response = await axiosInstance.post(
      "/orders",
      orderData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMyOrders = () => async (dispatch) => {
  try {
    dispatch(ordersStart());

    const response = await axiosInstance.get(
      "/orders/my-orders"
    );

    dispatch(
      ordersSuccess(response.data.orders)
    );

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to fetch orders";

    dispatch(ordersFailure(message));

    throw error;
  }
};