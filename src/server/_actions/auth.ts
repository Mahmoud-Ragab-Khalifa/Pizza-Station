"use server";

import { db } from "@/lib/prisma";
import { loginSchema, signupSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { getAppTranslations } from "@/lib/getAppTranslations";
import { Locale } from "next-intl";
import { getLocale } from "next-intl/server";

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

export const signup = async (prevState: unknown, formData: FormData) => {
  const locale = await getLocale();
  const translations = await getAppTranslations(locale);

  const result = signupSchema(translations).safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (user) {
      return {
        status: 409,
        message: translations.messages.userAlreadyExists,
        formData,
      };
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      message: translations.messages.accountCreated,
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
