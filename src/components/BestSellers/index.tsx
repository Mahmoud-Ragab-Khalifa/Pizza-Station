import { getLocale } from "next-intl/server";
import MainHeading from "../MainHeading";
import Menu from "../Menu";
import { getBestSellers } from "@/server/db/products";
import { getAppTranslations } from "@/lib/getAppTranslations";

const BestSellers = async () => {
  const bestSellersList = await getBestSellers(3);

  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center mb-6">
          <MainHeading
            subTitle={translations.home.bestSeller.checkOut}
            title={translations.home.bestSeller.OurBestSellers}
          />
        </div>

        <Menu items={bestSellersList} />
      </div>
    </section>
  );
};

export default BestSellers;
