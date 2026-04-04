"use client";

import Link from "../Link";
import { Routes } from "@/constants/enums";
import { selectCartTotalItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { ShoppingCartIcon } from "lucide-react";

const CartButton = () => {
  const totalItems = useAppSelector(selectCartTotalItems);
  return (
    <Link
      href={Routes.CART}
      className="block relative group"
      aria-label="Cart Page Button"
    >
      <span className="absolute -top-4 inset-s-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
        {totalItems}
      </span>

      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-300 transition-colors w-6! h-6!`}
      />
    </Link>
  );
};

export default CartButton;
