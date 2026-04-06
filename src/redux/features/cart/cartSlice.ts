"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Extra, Size } from "@prisma/client";
import { calculateTotals } from "@/lib/cartUtils";

export type CartItem = {
  id: string;
  key: string;
  name: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

export type CartState = {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
};

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalItems = action.payload.totalItems;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.key === action.payload.key,
      );

      if (existingItem) {
        existingItem.quantity! += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<{ key: string }>) => {
      state.items = state.items.filter((e) => e.key !== action.payload.key);

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    increase: (state, action: PayloadAction<{ key: string }>) => {
      const item = state.items.find((e) => e.key === action.payload.key);

      if (item) {
        item.quantity! += 1;
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    decrease: (state, action: PayloadAction<{ key: string }>) => {
      const item = state.items.find((e) => e.key === action.payload.key);

      if (item) {
        if (item.quantity! === 1) {
          state.items = state.items.filter((e) => e.key !== action.payload.key);
        } else {
          item.quantity! -= 1;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increase,
  decrease,
  clearCart,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;

export default cartSlice.reducer;
