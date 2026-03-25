import Image from "next/image";
import MainHeading from "../MainHeading";
import { Button } from "../ui/button";

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

        <div className="menuItemsList grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestSellersList.map(
            ({ id, image, name, basePrice, description }) => (
              <div
                className="menuItem p-5 bg-card border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                key={id}
              >
                <Image
                  src={image}
                  alt={name}
                  width={192}
                  height={192}
                  className="mx-auto"
                />

                <div className="flex items-center justify-between my-5">
                  <h4 className="font-semibold text-xl">{name}</h4>

                  <strong className="text-accent">{basePrice}</strong>
                </div>

                <p className="text-accent text-center">{description}</p>

                <div className="text-center">
                  <Button className="mt-5 px-8" size={"lg"}>
                    Add To Cart
                  </Button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
