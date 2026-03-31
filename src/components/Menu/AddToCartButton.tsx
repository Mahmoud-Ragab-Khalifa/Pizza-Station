"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import PickSize from "./PickSize";
import Extras from "./Extras";
import { ProductWithRelations } from "@/types/product";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { Extra } from "@prisma/client";
import { formatCurrency } from "@/lib/formatCurrency";

const AddToCartButton = ({ item }: { item: ProductWithRelations }) => {
  const { image, name, basePrice, description, sizes } = item;

  const cart = useAppSelector(selectCartItems);

  const [selectedSize, setSelectedSize] = useState(
    cart.find((e) => e.id === item.id)?.size ||
      sizes.find((e) => (e.name = "SMALL"))!,
  );

  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(
    cart.find((e) => e.id === item.id)?.extras || [],
  );

  let totalPrice = basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="block mx-auto mt-5 px-8" size={"lg"}>
          Add To Cart
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-96">
        <DialogHeader className="text-center">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="mx-auto"
          />

          <DialogTitle>{name}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[30vh] overflow-y-auto px-4 space-y-10">
          <PickSize
            item={item}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          <Extras
            item={item}
            selectedExtras={selectedExtras}
            setSelectedExtras={setSelectedExtras}
          />
        </div>

        <DialogFooter>
          <Button className="w-full rounded-xl">
            <span>Add To Cart</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartButton;
