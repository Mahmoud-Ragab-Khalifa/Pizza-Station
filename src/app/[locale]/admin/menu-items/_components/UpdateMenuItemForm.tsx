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
import { deleteProduct, updateProduct } from "../_actions/product";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { ProductWithRelations } from "@/types/product";

const UpdateMenuItemForm = ({
  translations,
  categories,
  product,
}: {
  translations: Translations;
  categories: Category[];
  product: ProductWithRelations;
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);

  const [categoryId, setCategoryId] = useState(product.categoryId);

  const [sizes, setSizes] = useState<Partial<Size>[]>(product.sizes);

  const [extras, setExtras] = useState<Partial<Extra>[]>(product.extras);

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}${Pages.MENU_ITEMS}`,
    translations,
  });

  const formData = new FormData();

  Object.entries(product).forEach(([Key, value]) => {
    if (value !== null && value !== undefined && Key !== "image") {
      formData.append(Key, value.toString());
    }
  });
  type ActionState = {
    message: string;
    error: ValidationErrors;
    status: number | null;
    formData: FormData;
  };
  const initialState: ActionState = {
    message: "",
    error: {},
    status: null,
    formData,
  };

  const updateAction = updateProduct.bind(null, {
    id: product.id,
    options: { sizes, extras },
  });

  const [state, action, pending] = useActionState<ActionState, FormData>(
    updateAction,
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
      </div>

      <div className="flex-1 card grid gap-6">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <FormFields
              key={field.name}
              {...field}
              error={state.error}
              defaultValue={fieldValue as string}
            />
          );
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

        <FormActions
          translations={translations}
          pending={pending}
          product={product}
        />
      </div>
    </form>
  );
};

export default UpdateMenuItemForm;

const FormActions = ({
  translations,
  pending,
  product,
}: {
  translations: Translations;
  pending: boolean;
  product?: ProductWithRelations;
}) => {
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });

  const handleDelete = async (id: string) => {
    try {
      setState((prev) => ({ ...prev, pending: true }));

      const res = await deleteProduct(id);

      setState((prev) => ({
        ...prev,
        status: res.status,
        message: res.message,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  return (
    <>
      <Button type="submit" className="w-full rounded-lg" disabled={pending}>
        {pending ? (
          <Loader />
        ) : product ? (
          translations.save
        ) : (
          translations.create
        )}
      </Button>

      {product && (
        <Button
          type="button"
          variant={"destructive"}
          className="w-full rounded-lg -mt-2"
          disabled={state.pending}
          onClick={() => handleDelete(product.id)}
        >
          {state.pending ? <Loader /> : translations.delete}
        </Button>
      )}

      <Link
        href={`${Routes.ADMIN}${Pages.MENU_ITEMS}`}
        className={`${buttonVariants({ variant: "outline" })} w-full rounded-lg -mt-2`}
      >
        {translations.cancel}
      </Link>
    </>
  );
};
