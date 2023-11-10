import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import cartReducer from "./slices/cartSlice";
import restaurantReducer from "./slices/restaurantSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: cartReducer
  // reducer: {
  //   cart: cartReducer,
  //   restaurant: restaurantReducer,
  // },
  // devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
});

export const persistor = store;
