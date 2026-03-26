/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const AddToCartButton = ({ item }: { item: any }) => {
  const { id, image, name, basePrice, description } = item;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="block mx-auto mt-5 px-8" size={"lg"}>
          Add To Cart
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-96">
        <DialogHeader className="text-center">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="mx-auto"
          />

          <DialogTitle>{name}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[30vh] overflow-y-auto px-4 space-y-10">
          <div className="text-center">Pick Your Pizza</div>
          <div className="text-center">Any Extras?</div>
        </div>

        <DialogFooter>
          <Button className="w-full rounded-xl">Add To Cart $10.99</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartButton;
