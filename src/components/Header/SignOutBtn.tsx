"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  const t = useTranslations("navbar");

  return (
    <Button className="lg:px-8" variant={"secondary"} onClick={() => signOut()}>
      {t("signOut")}
    </Button>
  );
};

export default SignOutBtn;
