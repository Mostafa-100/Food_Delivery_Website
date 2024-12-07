import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import cartReducer from "./cart";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
