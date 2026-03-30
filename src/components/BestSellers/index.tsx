import MainHeading from "../MainHeading";
import Menu from "../Menu";
import { getBestSellers } from "@/server/db/products";

const BestSellers = async () => {
  const bestSellersList = await getBestSellers();

  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center mb-6">
          <MainHeading subTitle="Check Out" title="Our Best Sellers" />
        </div>

        <Menu items={bestSellersList} />
      </div>
    </section>
  );
};

export default BestSellers;
