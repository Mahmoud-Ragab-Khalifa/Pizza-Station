"use client";

import FormFields from "@/components/FormFields/FormFields";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { useActionState, useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import UploadImage from "./UploadImage";
import { Category, Extra, Size } from "@prisma/client";
import AddSize from "./AddSize";
import AddExtras from "./AddExtras";
import Link from "@/components/Link";
import { ValidationErrors } from "@/validations/auth";
import { addProduct } from "../_actions/product";
import Loader from "@/components/Loader";
import { toast } from "sonner";

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

  const formData = new FormData();

  Object.entries({}).forEach(([Key, value]) => {
    if (value !== null && value !== undefined && Key !== "image") {
      formData.append(Key, value.toString());
    }
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(
    addProduct.bind(null, { categoryId }),
    initialState,
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      if (state.status === 201) {
        toast.success(state.message, { position: "top-center" });
      } else {
        toast.error(state.message, { position: "top-center" });
      }
    }
  });

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error.image}
          </p>
        )}
      </div>

      <div className="flex-1 card grid gap-6">
        {getFormFields().map((field: IFormField) => {
          return <FormFields key={field.name} {...field} error={state.error} />;
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

        <FormActions translations={translations} pending={pending} />
      </div>
    </form>
  );
};

export default Form;

const FormActions = ({
  translations,
  pending,
}: {
  translations: Translations;
  pending: boolean;
}) => {
  return (
    <>
      <Button type="submit" className="w-full rounded-lg" disabled={pending}>
        {pending ? <Loader /> : translations.create}
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
