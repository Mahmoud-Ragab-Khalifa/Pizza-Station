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
      className="rounded-md"
      onClick={() =>
        router.replace(pathname, {
          locale:
            locale === Languages.ARABIC ? Languages.ENGLISH : Languages.ARABIC,
        })
      }
    >
      {locale === Languages.ARABIC ? "الأنجليزية" : "Arabic"}
    </Button>
  );
};

export default LanguageToggler;
