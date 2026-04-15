import { getLocale } from "next-intl/server";
import { getAppTranslations } from "@/lib/getAppTranslations";

const Footer = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <footer className="border-t py-8 px-4 text-center text-accent">
      <div className="container">
        <p>{translations.copyRight}</p>
      </div>
    </footer>
  );
};

export default Footer;
