/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatCurrency";

const sizes = [
  { id: crypto.randomUUID(), name: "Small", price: 0 },
  { id: crypto.randomUUID(), name: "Medium", price: 4 },
  { id: crypto.randomUUID(), name: "Large", price: 8 },
];

const PickSize = ({ item }: { item: any }) => {
  return (
    <div>
      <p className="text-center mb-4">Pick Your Pizza</p>

      <RadioGroup defaultValue={sizes[0].name}>
        {sizes.map(({ id, name, price }) => (
          <div
            key={id}
            className="flex items-center gap-2 p-3 border rounded-md"
          >
            <RadioGroupItem value={name} id={name} />

            <Label htmlFor={name} className="mt-0.5 w-full cursor-pointer">
              <span>{name}</span>
              <strong>{formatCurrency(price + item.basePrice)}</strong>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PickSize;
