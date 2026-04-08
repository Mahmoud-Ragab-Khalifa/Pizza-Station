"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Languages } from "@/constants/enums";

const LanguageToggler = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      variant={"outline"}
      className={`${locale === Languages.ARABIC ? "font-roboto" : "font-cairo"} rounded-md`}
      onClick={() =>
        router.replace(pathname, {
          locale:
            locale === Languages.ARABIC ? Languages.ENGLISH : Languages.ARABIC,
        })
      }
    >
      {locale === Languages.ARABIC ? "English" : "العربية"}
    </Button>
  );
};

export default LanguageToggler;
