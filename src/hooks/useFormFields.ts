import { Pages } from "@/constants/enums";
import { IFormField } from "@/types/app";

export const useFormFields = (slug: string) => {
  const loginFields = (): IFormField[] => [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      autoFocus: true,
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      default:
        return [];
    }
  };

  return { getFormFields };
};
