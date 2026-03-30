"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatCurrency";
import { ProductWithRelations } from "@/types/product";
import { ProductSizes } from "@prisma/client";
import { useState } from "react";

const PickSize = ({ item }: { item: ProductWithRelations }) => {
  const { sizes } = item;

  const [active, setActive] = useState<ProductSizes>(sizes[0].name);

  return (
    <div>
      <p className="text-center font-bold text-lg mb-4">Pick Your Pizza</p>

      <RadioGroup
        value={active}
        onValueChange={(size: ProductSizes) => {
          setActive(size);
        }}
      >
        {sizes.map(({ id, name, price }) => (
          <div
            key={id}
            className={`flex items-center gap-2 p-3 rounded-md border transition-colors duration-300 ${active === name ? "border-primary/50" : "border-muted/50"}`}
          >
            <RadioGroupItem value={name} id={name} />

            <Label htmlFor={name} className="mt-0.5 w-full cursor-pointer">
              <span className="font-medium">{name}</span>
              <strong>{formatCurrency(price + item.basePrice)}</strong>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PickSize;
