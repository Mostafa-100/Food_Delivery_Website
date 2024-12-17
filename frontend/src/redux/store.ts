import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
