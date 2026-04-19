"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemOptions, { ItemOptionsKeys } from "./ItemOptions";
import { Translations } from "@/types/translations";
import { Extra } from "@prisma/client";

const AddExtras = ({
  translations,
  extras,
  setExtras,
}: {
  translations: Translations;
  extras: Partial<Extra>[];
  setExtras: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
}) => {
  return (
    <Accordion type="single" collapsible className="w-full" draggable>
      <AccordionItem value="item-1">
        <AccordionTrigger>{translations.extrasIngredients}</AccordionTrigger>
        <AccordionContent className="">
          <ItemOptions
            optionKey={ItemOptionsKeys.EXTRAS}
            translations={translations}
            state={extras}
            setState={setExtras}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AddExtras;
