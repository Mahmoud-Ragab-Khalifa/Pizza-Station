import { Pages, Routes } from "./enums";

type NavLink = {
  title: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  {
    title: "Menu",
    href: Routes.MENU,
  },
  {
    title: "About",
    href: Routes.ABOUT,
  },
  {
    title: "Contact",
    href: Routes.CONTACT,
  },
  {
    title: "Login",
    href: `${Routes.AUTH}${Pages.LOGIN}`,
  },
];
