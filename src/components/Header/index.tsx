import { Routes } from "@/constants/enums";
import Link from "../Link";
import Navbar from "./Navbar";
import { Button } from "../ui/button";
import { ShoppingCart, Sun } from "lucide-react";
import ThemeToggler from "../Theme/ThemeToggler";

const Header = () => {
  return (
    <header className="py-4 md:py-6 relative">
      <div className="container flex items-center">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl z-50"
        >
          🍕 Pizza
        </Link>

        <div className="flex-1 flex items-center justify-end gap-4 z-50">
          <Navbar />

          <Button variant={"outline"} className="hidden md:flex rounded-md">
            العربية
          </Button>

          <div className="hidden md:block">
            <ThemeToggler />
          </div>

          <ShoppingCart className="text-accent" />
        </div>
      </div>
    </header>
  );
};

export default Header;
