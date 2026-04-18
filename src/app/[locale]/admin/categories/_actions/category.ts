"use server";

import { Pages, Routes } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { db } from "@/lib/prisma";
import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  const result = addCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  const data = result.data;

  try {
    await db.category.create({
      data,
    });

    revalidatePath(`/${locale}${Routes.ADMIN}${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}${Routes.MENU}`);

    return {
      message: translations.messages.categoryAdded,
      status: 201,
    };
  } catch (error) {
    console.error(error);

    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};

export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  const result = updateCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  const data = result.data;

  try {
    await db.category.update({
      where: { id },
      data: {
        name: data.categoryName,
      },
    });

    revalidatePath(`/${locale}${Routes.ADMIN}${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}${Routes.MENU}`);

    return {
      message: translations.messages.updatecategorySucess,
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};
