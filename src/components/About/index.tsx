import MainHeading from "../MainHeading";
import { getLocale } from "next-intl/server";
import { getAppTranslations } from "@/lib/getAppTranslations";

const About = async () => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <section className="section-gap">
      <div className="container text-center">
        <MainHeading
          subTitle={translations.home.about.ourStory}
          title={translations.home.about.aboutUs}
        />

        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>{translations.home.about.descriptions.one}</p>

          <p>{translations.home.about.descriptions.two}</p>

          <p>{translations.home.about.descriptions.three}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
