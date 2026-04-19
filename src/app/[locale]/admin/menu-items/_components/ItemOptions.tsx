/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Translations } from "@/types/translations";
import { Extra, ProductExtras, ProductSizes, Size } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { Directions, Languages } from "@/constants/enums";

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

const sizesNames = [
  ProductSizes.SMALL,
  ProductSizes.MEDIUM,
  ProductSizes.LARGE,
];

const extrasNames = [
  ProductExtras.TOMATO,
  ProductExtras.ONION,
  ProductExtras.CHEESE,
];

const handleOptions = (
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>,
) => {
  const addOption = () => {
    setState((prev: any) => [...prev, { name: "", price: 0 }]);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: string,
  ) => {
    const newValue = e.target.value;

    setState((prev: any) => {
      const newSizes = [...prev];

      newSizes[index][fieldName] = newValue;

      return newSizes;
    });
  };

  const removeOption = (indexToRemove: number) => {
    setState((prev: any) =>
      prev.filter((_: any, index: number) => index !== indexToRemove),
    );
  };

  return { addOption, onChange, removeOption };
};

const ItemOptions = ({
  translations,
  state,
  setState,
  optionKey,
}: {
  translations: Translations;
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  optionKey: ItemOptionsKeys;
}) => {
  const { addOption, onChange, removeOption } = handleOptions(setState);

  const isAvOptions = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        return sizesNames.length > state.length;
      case ItemOptionsKeys.EXTRAS:
        return extrasNames.length > state.length;
    }
  };

  return (
    <>
      {state.length > 0 && (
        <ul className="grid gap-4">
          {state.map((item, index) => (
            <li key={index}>
              <div className="flex gap-3 flex-wrap card">
                <div className="flex-1 grid gap-2.5">
                  <Label className="capitalize">Name</Label>

                  <SelectName
                    item={item}
                    index={index}
                    onChange={onChange}
                    state={state}
                    optionKey={optionKey}
                  />
                </div>

                <div className="flex-1 grid gap-2.5">
                  <Label htmlFor={"price"} className="capitalize">
                    Extra Price
                  </Label>

                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0"
                    min={0}
                    value={item.price}
                    onChange={(e) => onChange(e, index, "price")}
                  />
                </div>

                <div className="flex sm:flex-col sm:items-end sm:justify-end basis-full sm:basis-0">
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="rounded-lg h-9 w-full sm:w-9 xl:w-20"
                    size={"icon"}
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isAvOptions() ? (
        <Button
          type="button"
          variant={"outline"}
          className="w-full rounded-md bg-primary/70 active:bg-primary active:scale-90 hover:bg-primary transition duration-300 mt-4"
          onClick={addOption}
        >
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin["menu-items"].addItemSize
            : translations.admin["menu-items"].addExtraItem}

          <Plus />
        </Button>
      ) : (
        <p className="text-center text-sm text-accent font-medium italic mt-4">
          No Available Options Found To Add You Added All
        </p>
      )}
    </>
  );
};

export default ItemOptions;

const SelectName = ({
  item,
  index,
  onChange,
  state,
  optionKey,
}: {
  item: Partial<Size> | Partial<Extra>;
  index: number;
  onChange: (e: any, index: any, fieldName: any) => void;
  state: Partial<Size>[] | Partial<Extra>[];
  optionKey: ItemOptionsKeys;
}) => {
  const locale = useLocale();
  const dir = locale === Languages.ARABIC ? Directions.RTL : Directions.LTR;

  const getNames = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        const filteredSizes = sizesNames.filter(
          (size) => !state.some((s) => s.name === size),
        );
        return filteredSizes;

      case ItemOptionsKeys.EXTRAS:
        const filteredExtras = extrasNames.filter(
          (extra) => !state.some((e) => e.name === extra),
        );
        return filteredExtras;
    }
  };

  const names = getNames();

  return (
    <Select
      dir={dir}
      value={item.name ? item.name : "select..."}
      onValueChange={(value) => onChange({ target: { value } }, index, "name")}
    >
      <SelectTrigger className="w-full">
        <SelectValue>{item.name ? item.name : "select..."}</SelectValue>
      </SelectTrigger>

      <SelectContent dir={dir} position="popper">
        <SelectGroup>
          {names.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
