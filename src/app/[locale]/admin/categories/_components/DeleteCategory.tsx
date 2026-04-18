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
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteCategory } from "../_actions/category";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteCategory = ({ category }: { category: Category }) => {
  const t = useTranslations("deleteCategory");

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

          <DialogTitle>{t("title")}</DialogTitle>

          <DialogDescription>
            {t.rich("desc", {
              category: category.name,
              span: (chunk) => (
                <span className="text-primary font-bold italic">{chunk}</span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button
            variant="destructive"
            disabled={state.isLoading}
            onClick={handleDelete}
            className="rounded-lg"
          >
            {t("deleteBtn")} <Trash2 />
          </Button>

          <DialogClose asChild>
            <Button variant="outline" className="rounded-lg">
              {t("cancelBtn")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
