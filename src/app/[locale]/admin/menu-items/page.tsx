import Link from "@/components/Link";
import { buttonVariants } from "@/components/ui/button";
import { Languages, Pages, Routes } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { ArrowRightCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const MnueItemsPage = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <Link
            href={`${Routes.ADMIN}${Pages.MENU_ITEMS}${Pages.NEW}`}
            className={`${buttonVariants({ variant: "secondary", size: "lg" })} px-9 mx-auto mb-10 max-w-fit rounded-md flex! shadow-xs shadow-primary/20 transition-shadow duration-300 hover:shadow-lg active:scale-90 group`}
          >
            {translations.admin["menu-items"].createNewMenuItem}

            <ArrowRightCircle
              className={`${locale === Languages.ARABIC ? "rotate-180" : "rotate-0"} animate-pulse group-hover:text-primary transition-colors duration-300 group-hover:animate-bounce`}
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default MnueItemsPage;
