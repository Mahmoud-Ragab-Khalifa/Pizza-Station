import MainHeading from "../MainHeading";
import Menu from "../Menu";

const bestSellersList = [
  {
    id: crypto.randomUUID(),
    name: "Pizza",
    description: "This Is A Pizza",
    basePrice: 12,
    image: "/assets/images/pizza.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Pizza",
    description: "This Is A Pizza",
    basePrice: 12,
    image: "/assets/images/pizza.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Pizza",
    description: "This Is A Pizza",
    basePrice: 12,
    image: "/assets/images/pizza.png",
  },
];

const BestSellers = () => {
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
