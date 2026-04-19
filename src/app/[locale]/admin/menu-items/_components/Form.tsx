"use client";

import FormFields from "@/components/FormFields/FormFields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { useState } from "react";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import { Category } from "@prisma/client";

const Form = ({
  translations,
  categories,
}: {
  translations: Translations;
  categories: Category[];
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  const [categoryId, setCategoryId] = useState(categories[0].id);

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

        <div className="grid grid-cols-2 gap-4">
          <SelectCategory
            translations={translations}
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        </div>

        <FormActions translations={translations} />
      </div>
    </form>
  );
};

export default Form;

const FormActions = ({ translations }: { translations: Translations }) => {
  return (
    <Button type="submit" className="w-full rounded-lg">
      {translations.create}
    </Button>
  );
};
