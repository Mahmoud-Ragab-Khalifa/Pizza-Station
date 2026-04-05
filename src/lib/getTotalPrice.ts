import { Extra, Size } from "@prisma/client";
import { formatCurrency } from "./formatCurrency";

export const getTotalPrice = (
  basePrice: number,
  selectedSize: Size,
  selectedExtras: Extra[] = [],
) => {
  let totalPrice = basePrice;

  if (selectedSize) {
    totalPrice += selectedSize.price;
  }

  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  return formatCurrency(totalPrice);
};
