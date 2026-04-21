import { getLocale } from "next-intl/server";
import Form from "../_components/Form";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { getCategories } from "@/server/db/categories";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";

const NewMenuItemPage = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    redirect(`/${locale}${Routes.ADMIN}${Pages.CATEGORIES}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          {/* <Form translations={translations} categories={categories} /> */}
        </div>
      </section>
    </main>
  );
};

export default NewMenuItemPage;
