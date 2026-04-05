"use client";

import {
  decrease,
  increase,
  removeFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "../Link";
import { Routes } from "@/constants/enums";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { getTotalPrice } from "@/lib/getTotalPrice";
import { generateUniqueKey } from "@/lib/generateUniqueKey";

const CartItems = () => {
  const cartItems = useAppSelector(selectCartItems);

  const dispatch = useAppDispatch();

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => {
            const key = generateUniqueKey(item.id, item.size!, item.extras!);

            return (
              <div
                key={item.key}
                className="card flex flex-col md:flex-row lg:flex-col justify-between gap-5"
              >
                <div className="flex gap-4 items-center flex-1">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={88}
                    height={88}
                    className="rounded-full w-22 h-22 object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-primary text-lg md:text-xl line-clamp-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-1">
                      <span className="text-foreground/90">Base Price:</span>

                      <strong>{formatCurrency(item.basePrice)}</strong>
                    </div>

                    <div className="flex items-center gap-2 my-px">
                      <div className="flex items-center gap-1">
                        <span className="text-foreground/90">Size:</span>

                        <span className="text-accent text-sm mt-0.5">
                          {item.size?.name || "SMALL"}
                        </span>
                      </div>

                      <strong className="text-primary/70 text-sm mt-0.5">
                        +{formatCurrency(item.size?.price || 0)}
                      </strong>
                    </div>

                    <div className="flex gap-1">
                      <span className="text-foreground/90">Extras:</span>

                      <span className="text-accent text-sm mt-0.75">
                        {item.extras && item.extras.length > 0 ? (
                          item.extras.map((e) => (
                            <span key={e.name} className="block">
                              <span className="text-sm me-2">
                                {e.name[0].toUpperCase() +
                                  e.name.slice(1).toLowerCase()}
                              </span>

                              <span className="text-primary/70">
                                +{formatCurrency(e.price)}
                              </span>
                            </span>
                          ))
                        ) : (
                          <span className="block">no-extras</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center xl:justify-end gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      className="fully-rounded-btn rounded-lg!"
                      disabled={item.quantity === 1}
                      onClick={() => {
                        dispatch(decrease({ key }));
                      }}
                    >
                      -
                    </Button>

                    <span>x{item.quantity}</span>

                    <Button
                      className="fully-rounded-btn rounded-lg!"
                      onClick={() => {
                        dispatch(increase({ key }));
                      }}
                    >
                      +
                    </Button>
                  </div>

                  <strong>
                    {getTotalPrice(item.basePrice, item.size!, item.extras!)}
                  </strong>

                  <Button
                    className="fully-rounded-btn rounded-lg!"
                    variant={"destructive"}
                    aria-label="Remove Cart Item"
                    onClick={() => {
                      dispatch(removeFromCart({ key }));
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-sm">
          <p className="text-muted-foreground inline">
            There Are No Items In Your Cart,{" "}
          </p>

          <Link
            href={Routes.MENU}
            className="underline text-primary font-medium"
          >
            Add Some
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartItems;
