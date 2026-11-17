import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,
  pages: 0,
  currentPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchProductsSuccess: (
      state,
      action
    ) => {
      state.loading = false;
      state.products =
        action.payload.products;
      state.total =
        action.payload.total;
      state.pages =
        action.payload.pages;
      state.currentPage =
        action.payload.page;
    },

    fetchProductsFailure: (
      state,
      action
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    setSelectedProduct: (
      state,
      action
    ) => {
      state.selectedProduct =
        action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;