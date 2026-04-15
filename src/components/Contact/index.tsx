import MainHeading from "../MainHeading";
import { getLocale } from "next-intl/server";
import { getAppTranslations } from "@/lib/getAppTranslations";

const Contact = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <section className="section-gap">
      <div className="container text-center">
        <MainHeading
          subTitle={translations.home.contact["Don'tHesitate"]}
          title={translations.home.contact.contactUs}
        />

        <div className="mt-8">
          <a
            href="tel:+201067055256"
            className="text-4xl underline text-accent"
          >
            +201067055256
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
