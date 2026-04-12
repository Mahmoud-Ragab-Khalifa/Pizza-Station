"use client";

import { useTranslations } from "next-intl";
import Link from "../Link";
import { Pages, Routes } from "@/constants/enums";
import { usePathname } from "@/i18n/navigation";

const SignInBtn = ({ color }: { color?: string }) => {
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const target = `${Routes.AUTH}${Pages.LOGIN}`;

  return (
    <Link
      href={target}
      className={`text-white rounded-md bg-${color}! ${pathname === target ? "lg:text-primary" : "lg:text-accent"} lg:font-semibold lg:hover:text-primary lg:transition-colors lg:duration-300 px-4 block py-1.25`}
    >
      {t("login")}
    </Link>
  );
};

export default SignInBtn;
