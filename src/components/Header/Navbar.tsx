"use client";

import { Menu, XIcon } from "lucide-react";
import Link from "../Link";
import { NAV_LINKS } from "@/constants/navigation";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { Pages, Routes } from "@/constants/enums";
import ThemeToggler from "../Theme/ThemeToggler";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav>
      <ul
        className={`z-50 flex flex-col md:flex-row absolute inset-s-0 md:inset-auto md:top-auto w-full md:w-auto md:static md:items-center gap-4 py-5 md:p-0 transition-all duration-500 top-full overflow-hidden ${isOpenMenu ? "max-h-64" : "max-h-0 md:max-h-full p-0!"} bg-muted md:bg-transparent`}
      >
        {NAV_LINKS.map(({ title, href }) => {
          const isAuth = href === `${Routes.AUTH}${Pages.LOGIN}`;
          const isActive = href === pathname;

          return (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 block md:px-3 py-2 font-semibold ${
                  isAuth
                    ? `${buttonVariants({ size: "lg" })} px-8! mx-4 md:m-0`
                    : `hover:text-primary transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-accent"
                      }`
                }`}
              >
                {title}
              </Link>
            </li>
          );
        })}

        <div className="flex items-center absolute inset-e-0 bottom-6 gap-4 mx-4 md:hidden md:p-0 md:m-0">
          <Button variant={"outline"} className="rounded-md">
            العربية
          </Button>

          <ThemeToggler />
        </div>
      </ul>

      <Button
        variant={"outline"}
        size={"icon-sm"}
        className="text-accent md:hidden rounded-md"
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
