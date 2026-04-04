import { CartItem } from "@/redux/features/cart/cartSlice";

export const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity!, 0);

  const totalPrice = items.reduce((acc, item) => {
    const sizePrice = item.size?.price || 0;

    const extrasPrice = item.extras?.reduce((s, e) => s + e.price, 0) || 0;

    return acc + (item.basePrice + sizePrice + extrasPrice) * item.quantity!;
  }, 0);

  return { totalItems, totalPrice };
};
