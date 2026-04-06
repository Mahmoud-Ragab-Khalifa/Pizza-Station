"use client";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { selectCartTotalPrice } from "@/redux/features/cart/cartSlice";
import { formatCurrency } from "@/lib/formatCurrency";

const CheckOutForm = () => {
  const totalItemsPrice = useAppSelector(selectCartTotalPrice);

  return (
    <div className="card max-h-fit">
      <h2 className="font-bold text-xl md:text-2xl mb-5 text-primary">
        Checkout
      </h2>

      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2.5">
            <Label htmlFor="tel">Phone</Label>
            <Input
              id="tel"
              type="tel"
              placeholder="Enter Your Phone"
              required
            />
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2.5">
              <Label htmlFor="postal">Postal Code</Label>
              <Input
                id="postal"
                type="text"
                placeholder="Enter Postal Code"
                required
              />
            </div>

            <div className="grid gap-2.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter Your City"
                required
              />
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Enter Postal Country"
              required
            />
          </div>

          <Button className="w-full rounded-lg">
            Pay<strong>{formatCurrency(totalItemsPrice + 5)}</strong>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
