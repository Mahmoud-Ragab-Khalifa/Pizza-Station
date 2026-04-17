"use client";

import { ADMIN_TABS } from "@/constants/adminTabs";
import Link from "@/components/Link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "@/i18n/navigation";

const AdminTabs = () => {
  const t = useTranslations();

  const pathname = usePathname();

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");

    return hrefArray.length > 1 ? pathname.startsWith(href) : pathname === href;
  };

  return (
    <nav className="section-gap pb-0! px-4">
      <ul className="flex items-center flex-wrap gap-4 justify-center">
        {ADMIN_TABS.map(({ title, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${isActiveTab(href) ? buttonVariants({ variant: "default" }) : buttonVariants({ variant: "outline" })} rounded-md hover:bg-primary transition-colors duration-300 active:scale-90`}
            >
              {t(title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminTabs;
