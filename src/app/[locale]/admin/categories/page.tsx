import { getAppTranslations } from "@/lib/getAppTranslations";
import { getCategories } from "@/server/db/categories";
import { getLocale } from "next-intl/server";
import Form from "./_components/Form";
import CategoryItem from "./_components/CategoryItem";

const CategoriesPage = async () => {
  const categories = await getCategories();

  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="max-w-lg mx-auto space-y-6">
            <Form translations={translations} />

            {categories.length > 0 ? (
              <ul className="grid gap-4">
                {categories.map((category) => (
                  <CategoryItem key={category.name} category={category} />
                ))}
              </ul>
            ) : (
              <p className="text-accent text-center py-10">
                {translations.noCategoriesFound}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;
