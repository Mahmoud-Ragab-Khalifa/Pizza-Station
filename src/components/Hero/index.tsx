import Image from "next/image";
import Link from "../Link";
import { ArrowRightCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { Routes } from "@/constants/enums";

const Hero = () => {
  return (
    <section className="section-gap">
      <div className="container flex items-center flex-col gap-y-12 md:flex-row">
        <div className="flex-1">
          <h1 className="text-4xl font-semibold">Slice Into Happiness</h1>

          <p className="text-accent my-4">
            Craving pizza? Weve got you covered with fresh ingredients, endless
            flavors, and the fastest delivery. Your perfect slice is just a tap
            away!
          </p>

          <div className="flex items-center gap-4">
            <Link href={Routes.MENU} className={buttonVariants({ size: "lg" })}>
              <span className="uppercase">Order Now</span>
              <ArrowRightCircle />
            </Link>

            <Link
              href={Routes.ABOUT}
              className="text-sm font-medium transition-colors duration-300 hover:text-primary flex items-center gap-1.5 py-2"
            >
              <span>Learn More</span>
              <ArrowRightCircle size={16} />
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Image
            className="mx-auto"
            src={"/assets/images/pizza.png"}
            alt="Pizza"
            width={250}
            height={250}
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
