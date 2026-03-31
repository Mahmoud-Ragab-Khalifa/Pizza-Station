"use client";

import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";

const CartItems = () => {
  const cartItems = useAppSelector(selectCartItems);

  return <div>CartItems [{cartItems.length}]</div>;
};

export default CartItems;
