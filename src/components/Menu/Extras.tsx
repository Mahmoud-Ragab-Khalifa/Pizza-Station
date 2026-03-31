"use client";

import { formatCurrency } from "@/lib/formatCurrency";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";
import { ProductWithRelations } from "@/types/product";

const Extras = ({ item }: { item: ProductWithRelations }) => {
  const { extras } = item;

  const [active, setActive] = useState<string[]>([]);

  return (
    <div>
      <p className="text-center font-bold text-lg mb-4">Any Extras?</p>

      {extras.length > 0 ? (
        <div className="space-y-3">
          {extras.map(({ id, name, price }) => (
            <div
              key={id}
              className={`flex items-center gap-2 p-3 rounded-md border transition-colors duration-300 
              ${active.includes(name) ? "border-primary/50" : "border-muted/50"}`}
            >
              <Checkbox
                id={name}
                name={name}
                checked={active.includes(name)}
                onCheckedChange={(checked) =>
                  checked
                    ? setActive([...active, name])
                    : setActive(active.filter((item) => item !== name))
                }
              />

              <Label htmlFor={name} className="mt-0.5 w-full cursor-pointer">
                <span className="font-medium">{name}</span>
                <strong>{formatCurrency(price)}</strong>
              </Label>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-accent">
          No Extras In {item.name}
        </p>
      )}
    </div>
  );
};

export default Extras;
