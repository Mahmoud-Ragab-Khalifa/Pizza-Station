"use client";

import { useActionState, useEffect } from "react";
import { addCategory } from "../_actions/category";
import { ValidationErrors } from "@/validations/auth";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Translations } from "@/types/translations";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import { toast } from "sonner";

type InitialStateType = {
  message?: string;
  error?: ValidationErrors;
  status?: number | null;
};

const initialState: InitialStateType = {
  message: "",
  error: {},
  status: null,
};

const Form = ({ translations }: { translations: Translations }) => {
  const [state, action, pending] = useActionState(addCategory, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state.message, { position: "top-center" });
    }
  }, [state.message]);

  return (
    <form action={action}>
      <div className="space-y-2.5">
        <Label htmlFor="name">
          {translations.admin.categories.form.name.label}
        </Label>

        <div className="flex items-center gap-4">
          <Input
            type="text"
            name="name"
            id="name"
            placeholder={translations.admin.categories.form.name.placeholder}
          />

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="rounded-lg"
          >
            {pending ? <Loader /> : translations.create}
          </Button>
        </div>

        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
      </div>
    </form>
  );
};

export default Form;
