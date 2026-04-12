"use client";

import { useTranslations } from "next-intl";
import Link from "../Link";
import { buttonVariants } from "../ui/button";
import { Pages, Routes } from "@/constants/enums";

const SignUpBtn = () => {
  const t = useTranslations("navbar");

  return (
    <Link
      href={`${Routes.AUTH}${Pages.Register}`}
      className={`${buttonVariants({ variant: "default" })} px-8`}
    >
      {t("register")}
    </Link>
  );
};

export default SignUpBtn;
