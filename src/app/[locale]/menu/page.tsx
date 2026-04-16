import Menu from "@/components/Menu";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { getProductsByCategory } from "@/server/db/products";
import { getLocale } from "next-intl/server";

const MenuPage = async () => {
  const categories = await getProductsByCategory();

  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <main>
      {categories.length > 0 ? (
        categories.map((category) => (
          <section key={category.id} className="section-gap">
            <div className="container text-center">
              <h1 className="text-primary font-bold text-4xl italic mb-6">
                {category.name}
              </h1>

              <Menu items={category.products} />
            </div>
          </section>
        ))
      ) : (
        <p className="text-accent text-center py-20">
          {translations.noProductsFound}
        </p>
      )}
    </main>
  );
};

export default MenuPage;
