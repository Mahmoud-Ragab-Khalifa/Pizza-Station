import { ProductWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";

const Menu = ({ items }: { items: ProductWithRelations[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Menu;
