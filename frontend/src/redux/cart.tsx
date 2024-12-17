import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    decrementNumOfItems: (state) => {
      state.numOfItems -= 1;
    },
    setNumOfItems: (state, action: PayloadAction<number>) => {
      state.numOfItems = action.payload;
    },
  },
});

export const { incrementNumOfItems, decrementNumOfItems, setNumOfItems } =
  cart.actions;
export default cart.reducer;
