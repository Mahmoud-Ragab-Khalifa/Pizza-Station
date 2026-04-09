"use server";

import { db } from "@/lib/prisma";
import { loginSchema } from "@/validations/auth";
import { getTranslations } from "next-intl/server";
import bcrypt from "bcrypt";

export const login = async (
  credentials: Record<"email" | "password", string> | undefined,
) => {
  const t = await getTranslations("messages");

  const result = (await loginSchema()).safeParse(credentials);

  if (result.success === false) {
    return {
      error: result.error.message,
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
        message: t("userNotFound"),
        status: 401,
      };
    }

    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password,
    );

    if (!isValidPassword) {
      return {
        message: t("incorrectPassword"),
        status: 401,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      message: t("loginSuccessful"),
      status: 200,
    };
  } catch (error) {
    console.error(error);

    return {
      message: t("unexpectedError"),
      status: 500,
    };
  }
};
