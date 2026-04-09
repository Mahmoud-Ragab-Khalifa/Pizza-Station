import * as z from "zod";
import { getTranslations } from "next-intl/server";

export const loginSchema = async () => {
  const t = await getTranslations("validation");

  return z.object({
    email: z
      .string()
      .trim()
      .email({
        message: t("validEmail"),
      }),

    password: z
      .string()
      .min(6, { message: t("passwordMinLength") })
      .max(40, { message: t("passwordMaxLength") }),
  });
};

export type ValidationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;
