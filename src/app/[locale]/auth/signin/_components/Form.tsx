"use client";

import FormFields from "@/components/FormFields/FormFields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";

const Form = () => {
  const { getFormFields } = useFormFields(Pages.LOGIN);

  return (
    <form className="grid gap-6">
      {getFormFields().map((field: IFormField) => (
        <FormFields key={field.name} {...field} error={{}} />
      ))}

      <Button type="submit" className="w-full rounded-lg">
        Login
      </Button>
    </form>
  );
};

export default Form;
