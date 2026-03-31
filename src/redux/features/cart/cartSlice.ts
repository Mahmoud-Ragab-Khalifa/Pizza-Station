import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},
});

export const {} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
