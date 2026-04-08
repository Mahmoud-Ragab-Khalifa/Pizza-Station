"use client";

import { Routes } from "@/constants/enums";
import Link from "../Link";
import Navbar from "./Navbar";
import ThemeToggler from "./ThemeToggler";
import CartButton from "./CartButton";
import LanguageToggler from "./LanguageToggler";

const Header = () => {
  return (
    <header className="pt-7 pb-4 md:pb-0 relative pe-2.5 md:pe-0">
      <div className="container flex items-center">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl z-50"
        >
          🍕 Pizza
        </Link>

        <div className="flex-1 flex items-center justify-end gap-4 z-50">
          <Navbar />

          <div className="hidden md:block">
            <LanguageToggler />
          </div>

          <div className="hidden md:block">
            <ThemeToggler />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
