import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Extra, Size } from "@prisma/client";

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
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
