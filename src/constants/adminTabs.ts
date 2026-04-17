import { Pages, Routes } from "./enums";

type adminTab = {
  title: string;
  href: string;
};

export const ADMIN_TABS: adminTab[] = [
  {
    title: "admin.tabs.profile",
    href: Routes.ADMIN,
  },
  {
    title: "admin.tabs.categories",
    href: `${Routes.ADMIN}${Pages.CATEGORIES}`,
  },
  {
    title: "admin.tabs.menuItems",
    href: `${Routes.ADMIN}${Pages.MENU_ITEMS}`,
  },
  {
    title: "admin.tabs.users",
    href: `${Routes.ADMIN}${Pages.USERS}`,
  },
  {
    title: "admin.tabs.orders",
    href: `${Routes.ADMIN}${Pages.ORDERS}`,
  },
];
