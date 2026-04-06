/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CartState, setCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";

export const useCartPersistence = (cartData: CartState) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const data = localStorage.getItem("storageCart");

    if (data) {
      dispatch(setCart(JSON.parse(data)));
    }

    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem("storageCart", JSON.stringify(cartData));
  }, [cartData, isHydrated]);
};
