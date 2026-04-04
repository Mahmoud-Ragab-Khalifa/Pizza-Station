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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { Extra, ProductSizes, Size } from "@prisma/client";
import { formatCurrency } from "@/lib/formatCurrency";
import { generateUniqueKey } from "@/lib/generateUniqueKey";

const data = [
  {
    id: "dywgdyuegdqghw",
    key: "dywgdyuegdqghw-SMALL-",
    image:
      "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=2048",
    name: "Margherita Pizza",
    basePrice: 12,
    size: {
      id: "ejwfwefhwjhfjwhopoewp",
      name: "SMALL",
      price: 0,
      productId: "dywgdyuegdqghw",
    },
    extras: [],
    quantity: 2,
  },
  {
    id: "dywgdyuegdqghw",
    key: "dywgdyuegdqghw-MEDIUM-",
    image:
      "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=2048",
    name: "Margherita Pizza",
    basePrice: 12,
    size: {
      id: "ergfsdghhweryterwty",
      name: "MEDIUM",
      price: 4,
      productId: "dywgdyuegdqghw",
    },
    extras: [],
    quantity: 2,
  },
  {
    id: "dywgdyuegdqghw",
    key: "dywgdyuegdqghw-LARGE-TOMATO",
    image:
      "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=2048",
    name: "Margherita Pizza",
    basePrice: 12,
    size: {
      id: "rewtergtyerhyer",
      name: "LARGE",
      price: 8,
      productId: "dywgdyuegdqghw",
    },
    extras: [
      {
        id: "erdthyertywerg",
        name: "TOMATO",
        price: 4,
        productId: "dywgdyuegdqghw",
      },
    ],
    quantity: 1,
  },
  {
    id: "dywgdyuegdqghw",
    key: "dywgdyuegdqghw-LARGE-CHEESE",
    image:
      "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=2048",
    name: "Margherita Pizza",
    basePrice: 12,
    size: {
      id: "rewtergtyerhyer",
      name: "LARGE",
      price: 8,
      productId: "dywgdyuegdqghw",
    },
    extras: [
      {
        id: "ewwwwwwwwhyghtr",
        name: "CHEESE",
        price: 8,
        productId: "dywgdyuegdqghw",
      },
    ],
    quantity: 1,
  },
  {
    id: "dywgdyuegdqghw",
    key: "dywgdyuegdqghw-MEDIUM-CHEESE-ONION-TOMATO",
    image:
      "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=2048",
    name: "Margherita Pizza",
    basePrice: 12,
    size: {
      id: "ergfsdghhweryterwty",
      name: "MEDIUM",
      price: 4,
      productId: "dywgdyuegdqghw",
    },
    extras: [
      {
        id: "ewwwwwwwwhyghtr",
        name: "CHEESE",
        price: 8,
        productId: "dywgdyuegdqghw",
      },
      {
        id: "dsfsdvgdfgdh",
        name: "ONION",
        price: 2,
        productId: "dywgdyuegdqghw",
      },
      {
        id: "erdthyertywerg",
        name: "TOMATO",
        price: 4,
        productId: "dywgdyuegdqghw",
      },
    ],
    quantity: 2,
  },
  {
    id: "dywgdyuegdqghw",
    key: "dywgdyuegdqghw-MEDIUM-CHEESE-TOMATO",
    image:
      "https://ooni.com/cdn/shop/articles/20220211142347-margherita-9920_ba86be55-674e-4f35-8094-2067ab41a671.jpg?v=1737104576&width=2048",
    name: "Margherita Pizza",
    basePrice: 12,
    size: {
      id: "ergfsdghhweryterwty",
      name: "MEDIUM",
      price: 4,
      productId: "dywgdyuegdqghw",
    },
    extras: [
      {
        id: "ewwwwwwwwhyghtr",
        name: "CHEESE",
        price: 8,
        productId: "dywgdyuegdqghw",
      },
      {
        id: "erdthyertywerg",
        name: "TOMATO",
        price: 4,
        productId: "dywgdyuegdqghw",
      },
    ],
    quantity: 1,
  },
];

const AddToCartButton = ({ item }: { item: ProductWithRelations }) => {
  console.log(data);

  const { id, image, name, basePrice, description, sizes } = item;

  const cart = useAppSelector(selectCartItems);

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

  let totalPrice = basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

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
          <Button className="w-full rounded-xl" onClick={handleAddToCart}>
            <span>Add To Cart</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartButton;
