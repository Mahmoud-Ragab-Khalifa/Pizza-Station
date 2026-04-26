import { Pages, Routes } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { getCategories } from "@/server/db/categories";
import { getProduct } from "@/server/db/products";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";
import UpdateMenuItemForm from "../../_components/UpdateMenuItemForm";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) => {
  const { locale, id } = await params;

  const product = await getProduct(id);

  // protect dynamic route by get product with id match params id if not redirect to menu
  if (!product) {
    redirect(`/${locale}${Routes.ADMIN}${Pages.MENU_ITEMS}`);
  }

  const categories = await getCategories();
  const translations = await getAppTranslations(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <UpdateMenuItemForm
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
};

export default EditProductPage;
