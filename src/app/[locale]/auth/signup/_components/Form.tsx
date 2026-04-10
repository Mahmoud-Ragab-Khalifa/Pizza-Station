"use client";

import FormFields from "@/components/FormFields/FormFields";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { useRouter } from "@/i18n/navigation";
import { signup } from "@/server/_actions/auth";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

const Form = ({ translations }: { translations: Translations }) => {
  const { getFormFields } = useFormFields({
    slug: Pages.Register,
    translations,
  });

  const [state, action, pending] = useActionState(signup, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.status && state.message) {
      if (state.status === 201) {
        toast.success(state.message, { position: "top-center" });
      } else {
        toast.error(state.message, { position: "top-center" });
      }
    }

    if (state.status === 201) {
      router.replace(`${Routes.AUTH}${Pages.LOGIN}`);
    }
  }, [router, state.message, state.status]);

  return (
    <form className="grid gap-6" action={action}>
      {getFormFields().map((field: IFormField) => {
        const fieldValue = state.formData?.get(field.name) as string;

        return (
          <FormFields
            key={field.name}
            {...field}
            error={state.error}
            defaultValue={fieldValue}
          />
        );
      })}

      <Button type="submit" disabled={pending} className="w-full rounded-lg">
        {pending ? <Loader /> : translations.auth.register.submit}
      </Button>
    </form>
  );
};

export default Form;
