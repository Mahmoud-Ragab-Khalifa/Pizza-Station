"use client";

import { Menu, Sun } from "lucide-react";
import Link from "../Link";
import { NAV_LINKS } from "@/constants/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <nav>
      <ul
        className={`z-50 flex flex-col md:flex-row absolute inset-s-0 md:inset-auto md:top-auto w-full md:w-auto md:static md:items-center gap-4 py-5 md:p-0 transition-all duration-500 top-full overflow-hidden ${isOpenMenu ? "max-h-64" : "max-h-0 md:max-h-full p-0!"} bg-muted md:bg-transparent`}
      >
        {NAV_LINKS.map(({ title, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="px-4 block md:px-3 py-2 font-semibold text-accent hover:text-primary transition-colors duration-300"
            >
              {title}
            </Link>
          </li>
        ))}

        <div className="flex items-center absolute inset-e-0 bottom-6 gap-4 mx-4  md:hidden md:p-0 md:m-0">
          <Button variant={"outline"} className="rounded-md">
            العربية
          </Button>

          <Button variant={"outline"} size={"icon-sm"} className="rounded-md">
            <Sun />
          </Button>
        </div>
      </ul>

      <Button
        variant={"outline"}
        size={"icon"}
        className="text-accent md:hidden rounded-md"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <Menu />
      </Button>
    </nav>
  );
};

export default Navbar;
