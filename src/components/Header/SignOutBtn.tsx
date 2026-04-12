"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const SignOutBtn = () => {
  const t = useTranslations("navbar");

  return (
    <Button className="lg:px-8" variant={"secondary"}>
      {t("signOut")}
    </Button>
  );
};

export default SignOutBtn;
