"use client";

import { Menu, XIcon } from "lucide-react";
import Link from "../Link";
import { NAV_LINKS } from "@/constants/navigation";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { Routes, UserRole } from "@/constants/enums";
import ThemeToggler from "./ThemeToggler";
import { usePathname } from "@/i18n/navigation";
import LanguageToggler from "./LanguageToggler";
import { useTranslations } from "next-intl";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

const Navbar = ({ initialSession }: { initialSession: Session | null }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpenMenu) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  const pathname = usePathname();

  const t = useTranslations();

  const session = useClientSession(initialSession);
  const role = session.data?.user.role;

  return (
    <nav ref={menuRef}>
      <ul
        className={`z-50 flex flex-col lg:flex-row absolute inset-s-0 lg:inset-auto lg:top-auto w-full lg:w-auto lg:static lg:items-center gap-4 lg:gap-0 py-5 lg:p-0 transition-all duration-500 top-full overflow-hidden ${isOpenMenu ? "max-h-64" : "max-h-0 lg:max-h-full p-0!"} bg-muted lg:bg-transparent`}
      >
        {NAV_LINKS.map(({ title, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={() => setIsOpenMenu(false)}
              className={`px-4 block lg:px-3 py-2 font-semibold hover:text-primary transition-colors duration-300 ${pathname === href ? "text-primary" : "text-accent"}`}
            >
              {t(title)}
            </Link>
          </li>
        ))}

        {session.data?.user && (
          <li>
            <Link
              href={role === UserRole.USER ? Routes.PROFILE : Routes.ADMIN}
              onClick={() => setIsOpenMenu(false)}
              className={`px-4 block lg:px-3 py-2 font-semibold hover:text-primary transition-colors duration-300 ${pathname.startsWith(role === UserRole.ADMIN ? Routes.ADMIN : Routes.PROFILE) ? "text-primary" : "text-accent"}`}
            >
              {role === UserRole.USER ? t("navbar.profile") : t("navbar.admin")}
            </Link>
          </li>
        )}

        <div className="flex items-center absolute inset-e-0 bottom-6 gap-4 mx-4 lg:hidden lg:p-0 lg:m-0">
          <LanguageToggler />

          <ThemeToggler />
        </div>
      </ul>

      <Button
        variant={"outline"}
        size={"icon-sm"}
        className="text-accent lg:hidden rounded-md"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        aria-label="Menu Icon"
      >
        {isOpenMenu ? (
          <XIcon className="w-5! h-5!" />
        ) : (
          <Menu className="w-5! h-5!" />
        )}
      </Button>
    </nav>
  );
};

export default Navbar;
