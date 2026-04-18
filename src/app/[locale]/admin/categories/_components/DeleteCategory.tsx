"use client";

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
import { Translations } from "@/types/translations";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteCategory } from "../_actions/category";
import { Category } from "@prisma/client";
import { toast } from "sonner";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteCategory = ({
  translations,
  category,
}: {
  translations: Translations;
  category: Category;
}) => {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
      setState((prev) => {
        return { ...prev, isLoading: true };
      });

      const res = await deleteCategory(category.id);

      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  useEffect(() => {
    if (state.message) {
      toast(state.message, { position: "top-center" });
    }
  }, [state.message]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2 />
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="gap-6! text-center">
        <DialogHeader className="gap-5!">
          <div className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive p-4 rounded-lg w-fit mx-auto">
            <Trash2 />
          </div>

          <DialogTitle>Delete Category?</DialogTitle>

          <DialogDescription>
            are you sure you want to delete{" "}
            <span className="text-primary font-medium italic">
              {category.name}
            </span>{" "}
            category from categories list
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-lg">
              {translations.cancel}
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            disabled={state.isLoading}
            onClick={handleDelete}
            className="rounded-lg"
          >
            {translations.delete} <Trash2 />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
