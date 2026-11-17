import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    ordersStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    ordersSuccess: (
      state,
      action
    ) => {
      state.loading = false;
      state.orders =
        action.payload;
    },

    ordersFailure: (
      state,
      action
    ) => {
      state.loading = false;
      state.error =
        action.payload;
    },
  },
});

export const {
  ordersStart,
  ordersSuccess,
  ordersFailure,
} = orderSlice.actions;

export default orderSlice.reducer;