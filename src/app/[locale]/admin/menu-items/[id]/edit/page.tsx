import { Pages, Routes } from "@/constants/enums";
import { getProduct, getProducts } from "@/server/db/products";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ id: product.id }));
}

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

  return (
    <main>
      <section className="section-gap">
        <div className="container">Edit</div>
      </section>
    </main>
  );
};

export default EditProductPage;
