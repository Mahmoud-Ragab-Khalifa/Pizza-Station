import { formatCurrency } from "@/lib/formatCurrency";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelations } from "@/types/product";

const MenuItem = ({ item }: { item: ProductWithRelations }) => {
  const { id, image, name, basePrice, description } = item;

  return (
    <div className="card" key={id}>
      <Image
        src={image}
        alt={name}
        width={192}
        height={192}
        className="mx-auto"
      />

      <div className="flex items-center justify-between my-5">
        <h4 className="font-semibold text-xl">{name}</h4>

        <strong className="text-accent">{formatCurrency(basePrice)}</strong>
      </div>

      <p className="text-accent text-center text-sm line-clamp-3">
        {description}
      </p>

      <AddToCartButton item={item} />
    </div>
  );
};

export default MenuItem;
