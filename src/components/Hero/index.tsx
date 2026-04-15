import Image from "next/image";
import Link from "../Link";
import { ArrowRightCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { Languages, Routes } from "@/constants/enums";
import { getLocale } from "next-intl/server";
import { getAppTranslations } from "@/lib/getAppTranslations";

const Hero = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <section className="section-gap">
      <div className="container flex items-center flex-col gap-y-12 md:flex-row">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold">
            {translations.home.hero.title}
          </h1>

          <p className="text-accent my-4">
            {translations.home.hero.description}
          </p>

          <div className="flex items-center gap-4">
            <Link href={Routes.MENU} className={buttonVariants({ size: "lg" })}>
              <span className="uppercase">
                {translations.home.hero.orderNow}
              </span>

              <ArrowRightCircle
                className={
                  locale === Languages.ARABIC ? "rotate-180" : "rotate-0"
                }
              />
            </Link>

            <Link
              href={Routes.ABOUT}
              className="text-sm font-medium transition-colors duration-300 hover:text-primary flex items-center gap-1.5 py-2"
            >
              <span>{translations.home.hero.learnMore}</span>

              <ArrowRightCircle
                size={16}
                className={
                  locale === Languages.ARABIC ? "rotate-180" : "rotate-0"
                }
              />
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Image
            className="mx-auto"
            src={"/assets/images/pizza.png"}
            alt="Pizza"
            width={250}
            height={250}
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
