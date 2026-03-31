"use client";

import { formatCurrency } from "@/lib/formatCurrency";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ProductWithRelations } from "@/types/product";
import { Extra } from "@prisma/client";

const Extras = ({
  item,
  selectedExtras,
  setSelectedExtras,
}: {
  item: ProductWithRelations;
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) => {
  const { extras } = item;

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((e) => e.id === extra.id);

      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      }

      return [...prev, extra];
    });
  };

  return (
    <div>
      <p className="text-center font-bold text-lg mb-4">Any Extras?</p>

      {extras.length > 0 ? (
        <div className="space-y-3">
          {extras.map((extra) => {
            const isSelected = selectedExtras.some((e) => e.id === extra.id);

            return (
              <div
                key={extra.id}
                className={`flex items-center gap-2 p-3 rounded-md border transition-colors duration-300 ${
                  isSelected ? "border-primary/50" : "border-muted/50"
                }`}
              >
                <Checkbox
                  id={extra.name}
                  name={extra.name}
                  onCheckedChange={() => toggleExtra(extra)}
                  checked={isSelected}
                />

                <Label
                  htmlFor={extra.name}
                  className="mt-0.5 w-full cursor-pointer"
                >
                  <span className="font-medium">{extra.name}</span>
                  <strong>{formatCurrency(extra.price)}</strong>
                </Label>
              </div>
            );
          })}
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
