"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemOptions from "./ItemOptions";
import { Translations } from "@/types/translations";
import { Size } from "@prisma/client";

const AddSize = ({
  translations,
  sizes,
  setSizes,
}: {
  translations: Translations;
  sizes: Partial<Size>[];
  setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
}) => {
  return (
    <Accordion type="single" collapsible className="w-full" draggable>
      <AccordionItem value="item-1">
        <AccordionTrigger>{translations.sizes}</AccordionTrigger>
        <AccordionContent className="">
          <ItemOptions
            translations={translations}
            state={sizes}
            setState={setSizes}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddSize;
