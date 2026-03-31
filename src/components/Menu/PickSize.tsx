"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatCurrency";
import { ProductWithRelations } from "@/types/product";
import { Size } from "@prisma/client";

const PickSize = ({
  item,
  selectedSize,
  setSelectedSize,
}: {
  item: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) => {
  const { sizes } = item;

  return (
    <div>
      <p className="text-center font-bold text-lg mb-4">Pick Your Pizza</p>

      {sizes.length > 0 ? (
        <RadioGroup value={selectedSize.name}>
          {sizes.map(({ id, name, price }) => (
            <div
              key={id}
              className={`flex items-center gap-2 p-3 rounded-md border transition-colors duration-300 ${selectedSize.name === name ? "border-primary/50" : "border-muted/50"}`}
            >
              <RadioGroupItem
                value={name}
                id={name}
                checked={
                  selectedSize.id === sizes.find((size) => size.id === id)?.id
                }
                onClick={() =>
                  setSelectedSize(sizes.find((size) => size.id === id)!)
                }
              />

              <Label htmlFor={name} className="mt-0.5 w-full cursor-pointer">
                <span className="font-medium">{name}</span>
                <strong>{formatCurrency(price + item.basePrice)}</strong>
              </Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <p className="text-center text-sm text-accent">
          No Sizes In {item.name}
        </p>
      )}
    </div>
  );
};

export default PickSize;
