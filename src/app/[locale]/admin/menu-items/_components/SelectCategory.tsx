"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Directions, Languages } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { Category } from "@prisma/client";
import { useLocale } from "next-intl";

const SelectCategory = ({
  translations,
  categories,
  categoryId,
  setCategoryId,
}: {
  translations: Translations;
  categories: Category[];
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const locale = useLocale();
  const dir = locale === Languages.ARABIC ? Directions.RTL : Directions.LTR;

  return (
    <div className="grid gap-2.5">
      <Label htmlFor={"categoryId"} className="capitalize">
        {translations.category}
      </Label>

      <Select
        name="categoryId"
        value={categoryId}
        onValueChange={setCategoryId}
      >
        <SelectTrigger dir={dir} className="w-full" id="category">
          <SelectValue placeholder={translations.category} />
        </SelectTrigger>

        <SelectContent dir={dir} position="popper">
          <SelectGroup>
            {categories.map(({ id, name }) => (
              <SelectItem key={name} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCategory;
