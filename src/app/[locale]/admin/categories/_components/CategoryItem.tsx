import { Category } from "@prisma/client";
import EditCategory from "./EditCategory";
import { getLocale } from "next-intl/server";
import { getAppTranslations } from "@/lib/getAppTranslations";
import DeleteCategory from "./DeleteCategory";

const CategoryItem = async ({ category }: { category: Category }) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <li className="card flex justify-between items-center">
      <h3 className="text-primary font-semibold text-lg flex-1">
        {category.name}
      </h3>

      <div className="flex items-center gap-2">
        <EditCategory translations={translations} category={category} />

        <DeleteCategory translations={translations} category={category} />
      </div>
    </li>
  );
};

export default CategoryItem;
