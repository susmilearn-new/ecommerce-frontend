import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product =
        action.payload;

      const existingItem =
        state.items.find(
          (item) =>
            item.product ===
            product._id
        );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
    },

    removeFromCart: (
      state,
      action
    ) => {
      state.items =
        state.items.filter(
          (item) =>
            item.product !==
            action.payload
        );
    },

    increaseQuantity: (
      state,
      action
    ) => {
      const item =
        state.items.find(
          (item) =>
            item.product ===
            action.payload
        );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (
      state,
      action
    ) => {
      const item =
        state.items.find(
          (item) =>
            item.product ===
            action.payload
        );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items =
            state.items.filter(
              (cartItem) =>
                cartItem.product !==
                action.payload
            );
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;