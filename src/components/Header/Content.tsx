"use client";

import { Routes } from "@/constants/enums";
import Link from "../Link";
import Navbar from "./Navbar";
import ThemeToggler from "./ThemeToggler";
import CartButton from "./CartButton";
import LanguageToggler from "./LanguageToggler";
import { useTranslations } from "next-intl";
import SignInBtn from "./SignInBtn";
import SignUpBtn from "./SignUpBtn";
import SignOutBtn from "./SignOutBtn";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/useClientSession";

const Content = ({ initialSession }: { initialSession: Session | null }) => {
  const t = useTranslations();

  const session = useClientSession(initialSession);

  return (
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 justify-between lg:justify-start">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl z-50"
        >
          🍕 {t("logo")}
        </Link>

        <div className="flex lg:hidden items-center gap-5">
          <CartButton />

          {session.data?.user ? <SignOutBtn /> : <SignInBtn color="primary" />}

          <Navbar initialSession={initialSession} />
        </div>

        <div className="hidden lg:block">
          <Navbar initialSession={initialSession} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 z-50">
        <div className="hidden lg:flex items-center gap-4">
          {session.data?.user ? (
            <SignOutBtn />
          ) : (
            <div className="flex items-center gap-4">
              <SignInBtn />

              <SignUpBtn />
            </div>
          )}

          <LanguageToggler />

          <ThemeToggler />

          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default Content;
