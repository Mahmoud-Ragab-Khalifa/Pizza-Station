/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  setCart,
} from "@/redux/features/cart/cartSlice";
import { Extra, ProductSizes, Size } from "@prisma/client";
import { generateUniqueKey } from "@/lib/generateUniqueKey";
import QuantityControl from "./QuantityControl";
import { getTotalPrice } from "@/lib/getTotalPrice";

const AddToCartButton = ({ item }: { item: ProductWithRelations }) => {
  const cart = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalItems = useAppSelector(selectCartTotalItems);

  const { id, image, name, basePrice, description, sizes } = item;

  const dispatch = useAppDispatch();

  const cartItemsOfProduct = cart.filter((e) => e.id === id);

  const lastCartItem = cartItemsOfProduct[cartItemsOfProduct.length - 1];

  const [selectedSize, setSelectedSize] = useState<Size>(
    lastCartItem?.size ??
      sizes.find((e) => e.name === ProductSizes.SMALL) ??
      sizes[0],
  );

  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(
    lastCartItem?.extras ?? [],
  );

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("storageCart");

    if (data) {
      dispatch(setCart(JSON.parse(data)));
    }

    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "storageCart",
      JSON.stringify({
        items: cart,
        totalPrice,
        totalItems,
      }),
    );
  }, [cart, totalPrice, totalItems, isHydrated]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        key: generateUniqueKey(id, selectedSize, selectedExtras),
        image,
        name,
        basePrice,
        size: selectedSize,
        extras: selectedExtras,
      }),
    );
  };

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
          {cart.find(
            (e) =>
              e.key === generateUniqueKey(id, selectedSize, selectedExtras),
          ) ? (
            <QuantityControl
              id={id}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          ) : (
            <Button className="w-full rounded-xl" onClick={handleAddToCart}>
              <span>Add To Cart</span>

              <strong>
                {getTotalPrice(basePrice, selectedSize, selectedExtras)}
              </strong>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartButton;
