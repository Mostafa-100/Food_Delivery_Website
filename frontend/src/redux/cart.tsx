import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  numOfItems: number;
}

export const cart = createSlice({
  name: "cart",
  initialState: {
    numOfItems: 0,
  } as CartState,
  reducers: {
    incrementNumOfItems: (state) => {
      state.numOfItems += 1;
    },
  },
});

export const { incrementNumOfItems } = cart.actions;
export default cart.reducer;
