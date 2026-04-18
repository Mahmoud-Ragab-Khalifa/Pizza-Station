"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Translations } from "@/types/translations";
import { ValidationErrors } from "@/validations/auth";
import { Category } from "@prisma/client";
import { Edit, XIcon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateCategory } from "../_actions/category";

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

const EditCategory = ({
  translations,
  category,
}: {
  translations: Translations;
  category: Category;
}) => {
  const [state, action, pending] = useActionState(
    updateCategory.bind(null, category.id),
    initialState,
  );

  useEffect(() => {
    if (state.message) {
      toast(state.message, { position: "top-center" });
    }
  }, [state.message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-primary" variant={"outline"} size={"icon"}>
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader className="flex! flex-row! items-center justify-between">
          <DialogTitle className="text-primary font-semibold text-xl">
            {translations.admin.categories.form.editName}
          </DialogTitle>

          <DialogClose asChild>
            <Button
              variant="outline"
              size={"icon-xs"}
              className="hover:bg-destructive/50"
            >
              <XIcon />
            </Button>
          </DialogClose>

          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <form action={action}>
          <div className="grid gap-4">
            <Label htmlFor="category-name" className="text-accent">
              {translations.admin.categories.form.name.label}
            </Label>

            <Input
              type="text"
              id="categoryName"
              name="categoryName"
              defaultValue={category.name}
              placeholder={translations.admin.categories.form.name.placeholder}
            />

            {state.error?.categoryName && (
              <p className="text-sm text-destructive absolute top-12">
                {state.error?.categoryName}
              </p>
            )}
          </div>

          <DialogFooter className="mt-10">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-lg px-8">
                {translations.cancel}
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={pending}
              className="rounded-lg px-8"
            >
              {pending ? <Loader /> : translations.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
