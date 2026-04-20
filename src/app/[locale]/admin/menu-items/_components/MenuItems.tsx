import Link from "@/components/Link";
import { Pages, Routes } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { Product } from "@prisma/client";
import Image from "next/image";

const MenuItems = ({
  products,
  translations,
}: {
  products: Product[];
  translations: Translations;
}) => {
  return products && products.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`${Routes.ADMIN}${Pages.MENU_ITEMS}/${product.id}${Pages.EDIT}`}
        >
          <div className="card relative group overflow-hidden">
            <Image
              width={200}
              height={200}
              alt={product.name}
              src={product.image}
              className="w-50 h-50 object-cover rounded-full mx-auto"
            />

            <p className="text-primary text-center font-semibold italic mt-4">
              {product.name}
            </p>

            <div className="absolute transform top-1/2 left-1/2 -translate-1/2 w-0 h-0 rounded-full bg-card/20 group-hover:w-96 group-hover:h-96 transition-all duration-500 group-active:w-96 group-active:h-96" />
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="text-accent text-center">{translations.noProductsFound}</p>
  );
};

export default MenuItems;
