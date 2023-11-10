import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  cart_items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart_items = [...state.cart_items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.cart_items.findIndex(
        (item) => item.id === action.payload.id
      );

      let new_cart = [...state.cart_items];

      if (index >= 0) {
        new_cart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove item as this product does not exist in cart`
        );
      }
      state.cart_items = new_cart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state) => state?.cart_items || 0;

const selectCartItemsById = (state, id) =>
  state.cart_items?.filter((item) => item.id === id);

export const memoizedSelectCartItems = createSelector(
  [selectCartItemsById],
  (items) => items
);

export const selectCartTotal = (state) =>
  state.cart_items?.reduce((total, item) => (total += item.price), 0);

export default cartSlice.reducer;
