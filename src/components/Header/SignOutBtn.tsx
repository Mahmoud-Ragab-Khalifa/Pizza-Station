"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Pages, Routes } from "@/constants/enums";

const SignOutBtn = () => {
  const t = useTranslations("navbar");

  const locale = useLocale();

  return (
    <Button
      className="lg:px-8"
      variant={"default"}
      onClick={() =>
        signOut({ callbackUrl: `/${locale}${Routes.AUTH}${Pages.LOGIN}` })
      }
    >
      {t("signOut")}
    </Button>
  );
};

export default SignOutBtn;
