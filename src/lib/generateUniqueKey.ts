import { Extra, Size } from "@prisma/client";

export const generateUniqueKey = (id: string, size: Size, extras: Extra[]) => {
  return `${id}-${size?.name || "SMALL"}-${
    extras
      .map((e) => e.name)
      .sort()
      .join("-") || "no-extras"
  }`;
};
