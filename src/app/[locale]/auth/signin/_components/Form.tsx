"use client";

import FormFields from "@/components/FormFields/FormFields";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { useRouter } from "@/i18n/navigation";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Form = ({ translations }: { translations: Translations }) => {
  const { getFormFields } = useFormFields({ slug: Pages.LOGIN, translations });

  const formRef = useRef<HTMLFormElement>(null);

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => (data[key] = value.toString()));

    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);

        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError, { position: "top-center" });
        }
      }

      if (res?.ok) {
        toast.success(translations.messages.loginSuccessful, {
          position: "top-center",
        });

        router.replace(Routes.PROFILE);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="grid gap-6" onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <FormFields key={field.name} {...field} error={error} />
      ))}

      <Button type="submit" className="w-full rounded-lg" disabled={isLoading}>
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  );
};

export default Form;
