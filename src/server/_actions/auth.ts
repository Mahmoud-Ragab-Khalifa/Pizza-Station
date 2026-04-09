"use server";

import { db } from "@/lib/prisma";
import { loginSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { Locale } from "next-intl";

export const login = async (
  credentials: Record<"email" | "password", string> | undefined,
  locale: Locale,
) => {
  const translations = await getAppTranslations(locale);

  const result = loginSchema(translations).safeParse(credentials);

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      return {
        message: translations.messages.userNotFound,
        status: 401,
      };
    }

    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password,
    );

    if (!isValidPassword) {
      return {
        message: translations.messages.incorrectPassword,
        status: 401,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      message: translations.messages.loginSuccessful,
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
