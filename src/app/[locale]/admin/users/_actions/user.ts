"use server";

import { Pages, Routes } from "@/constants/enums";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { db } from "@/lib/prisma";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  try {
    await db.user.delete({ where: { id } });

    revalidatePath(`/${locale}${Routes.ADMIN}${Pages.USERS}`);
    revalidatePath(
      `/${locale}${Routes.ADMIN}${Pages.USERS}/${id}${Pages.EDIT}`,
    );

    return {
      status: 200,
      message: translations.messages.deleteUserSucess,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
