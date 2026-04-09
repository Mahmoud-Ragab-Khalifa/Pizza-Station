import "server-only";

import { Languages } from "@/constants/enums";
import { Locale } from "next-intl";

const messages = {
  ar: () => import("../../messages/ar.json").then((module) => module.default),
  en: () => import("../../messages/en.json").then((module) => module.default),
};

export const getAppTranslations = async (locale: Locale) => {
  return locale === Languages.ARABIC ? messages.ar() : messages.en();
};
