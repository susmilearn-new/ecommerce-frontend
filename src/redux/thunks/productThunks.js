import axiosInstance from "../../api/axiosInstance";

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedProduct,
} from "../slices/productSlice";

export const fetchProducts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(
        fetchProductsStart()
      );

      const response =
        await axiosInstance.get(
          "/products",
          {
            params,
          }
        );

      dispatch(
        fetchProductsSuccess(
          response.data
        )
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data
          ?.message ||
        "Failed to fetch products";

      dispatch(
        fetchProductsFailure(
          message
        )
      );

      throw error;
    }
  };

export const fetchProductById =
  (id) =>
  async (dispatch) => {
    try {
      const response =
        await axiosInstance.get(
          `/products/${id}`
        );

      dispatch(
        setSelectedProduct(
          response.data
        )
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };