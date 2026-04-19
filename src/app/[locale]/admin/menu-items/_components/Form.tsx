"use client";

import FormFields from "@/components/FormFields/FormFields";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { useState } from "react";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import { Category, Extra, Size } from "@prisma/client";
import AddSize from "./AddSize";
import AddExtras from "./AddExtras";
import Link from "@/components/Link";

const Form = ({
  translations,
  categories,
}: {
  translations: Translations;
  categories: Category[];
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  const [categoryId, setCategoryId] = useState(categories[0].id);

  const [sizes, setSizes] = useState<Partial<Size>[]>([]);

  const [extras, setExtras] = useState<Partial<Extra>[]>([]);

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}${Pages.MENU_ITEMS}`,
    translations,
  });

  return (
    <form className="flex flex-col md:flex-row gap-10">
      <UploadImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      <div className="flex-1 card grid gap-6">
        {getFormFields().map((field: IFormField) => {
          return <FormFields key={field.name} {...field} error={{}} />;
        })}

        <SelectCategory
          translations={translations}
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />

        <AddSize
          translations={translations}
          sizes={sizes}
          setSizes={setSizes}
        />

        <AddExtras
          translations={translations}
          extras={extras}
          setExtras={setExtras}
        />

        <FormActions translations={translations} />
      </div>
    </form>
  );
};

export default Form;

const FormActions = ({ translations }: { translations: Translations }) => {
  return (
    <>
      <Button type="submit" className="w-full rounded-lg">
        {translations.create}
      </Button>

      <Link
        href={`${Routes.ADMIN}${Pages.MENU_ITEMS}`}
        className={`${buttonVariants({ variant: "outline" })} w-full rounded-lg -mt-2`}
      >
        {translations.cancel}
      </Link>
    </>
  );
};
