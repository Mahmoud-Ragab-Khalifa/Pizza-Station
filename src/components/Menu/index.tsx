import { ProductWithRelations } from "@/types/product";
import MenuItem from "./MenuItem";
import { getLocale } from "next-intl/server";
import { getAppTranslations } from "@/lib/getAppTranslations";

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return items.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <p className="text-accent text-center">{translations.noProductsFound}</p>
  );
};

export default Menu;
