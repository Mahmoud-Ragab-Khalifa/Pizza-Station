"use server";

import { Pages, Routes } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { db } from "@/lib/prisma";
import { addProductSchema } from "@/validations/product";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addProduct = async (
  args: { categoryId: string },
  prevState: unknown,
  formData: FormData,
) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  const result = addProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;

  const basePrice = Number(data.basePrice);

  const imageFile = data.image as File;

  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile)
    : undefined;

  try {
    if (imageUrl) {
      await db.product.create({
        data: {
          ...data,
          image: imageUrl,
          basePrice,
          categoryId: args.categoryId,
        },
      });

      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}${Routes.MENU}`);
      revalidatePath(`/${locale}${Routes.ADMIN}${Pages.MENU_ITEMS}`);

      return {
        message: translations.messages.productAdded,
        status: 201,
      };
    }

    return {};
  } catch (error) {
    console.error(error);

    return {
      message: translations.messages.unexpectedError,
      status: 500,
    };
  }
};

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("pathName", "profile_images");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const image = (await response.json()) as { url: string };

    return image.url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
  }
};

export const deleteProduct = async (id: string) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  try {
    await db.product.delete({ where: { id } });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}${Routes.MENU}`);
    revalidatePath(`/${locale}${Routes.ADMIN}${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}${Routes.ADMIN}${Pages.MENU_ITEMS}/${id}${Pages.EDIT}`,
    );

    return {
      message: translations.messages.deleteProductSucess,
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
