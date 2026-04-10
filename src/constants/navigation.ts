import { Pages, Routes } from "./enums";

type NavLink = {
  title: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  {
    title: "navbar.menu",
    href: Routes.MENU,
  },
  {
    title: "navbar.about",
    href: Routes.ABOUT,
  },
  {
    title: "navbar.contact",
    href: Routes.CONTACT,
  },
  {
    title: "navbar.login",
    href: `${Routes.AUTH}${Pages.LOGIN}`,
  },
];
