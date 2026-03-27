import { formatCurrency } from "@/lib/formatCurrency";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const extras = [
  { id: crypto.randomUUID(), name: "Chesse", price: 2 },
  { id: crypto.randomUUID(), name: "Onion", price: 4 },
  { id: crypto.randomUUID(), name: "Tomato", price: 8 },
];

const Extras = () => {
  return (
    <div>
      <p className="text-center font-bold text-lg mb-4">Any Extras?</p>

      <div className="space-y-3">
        {extras.map(({ id, name, price }) => (
          <div
            key={id}
            className="flex items-center gap-2 p-3 border rounded-md"
          >
            <Checkbox id={name} name={name} />

            <Label htmlFor={name} className="mt-0.5 w-full cursor-pointer">
              <span className="font-medium">{name}</span>
              <strong>{formatCurrency(price)}</strong>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Extras;
