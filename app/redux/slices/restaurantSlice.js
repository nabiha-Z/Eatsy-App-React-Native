
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  imgurl: null,
  title: null,
  rating: null,
  genre: null,
  address: null,
  short_description: null,
  dishes: [],
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export const selectRestaurant = (state) => state?.restaurant.restaurant;

export default restaurantSlice.reducer;

