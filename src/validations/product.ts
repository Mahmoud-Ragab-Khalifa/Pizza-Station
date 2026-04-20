import { Translations } from "@/types/translations";
import { z } from "zod";

const getCommonValidations = (translations: Translations) => {
  return {
    name: z.string().trim().min(1, {
      message: translations.admin["menu-items"].form.name.validation.required,
    }),
    description: z.string().trim().min(1, {
      message:
        translations.admin["menu-items"].form.description.validation.required,
    }),
    basePrice: z.string().min(1, {
      message:
        translations.admin["menu-items"].form.basePrice.validation.required,
    }),
    categoryId: z.string().min(1, {
      message:
        translations.admin["menu-items"].form.category.validation.required,
    }),
  };
};

const imageValidation = (translations: Translations, isRequired: boolean) => {
  return !isRequired
    ? z.custom((value) => value instanceof File)
    : z.custom(
        (value) => {
          if (typeof value !== "object" || !value) {
            return false;
          }

          if (!(value instanceof File)) {
            return false;
          }

          const validMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
          ];

          return validMimeTypes.includes(value.type);
        },

        {
          message:
            translations.admin["menu-items"].form.image.validation.required,
        },
      );
};

export const addProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, true),
  });
};

export const updateProductSchema = (translations: Translations) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidation(translations, false),
  });
};
