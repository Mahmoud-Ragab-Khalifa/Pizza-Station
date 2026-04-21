"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteUser } from "../_actions/user";
import { toast } from "sonner";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const [state, setState] = useState<{
    pending: boolean;
    status: null | number;
    message: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      setState((prev) => ({ ...prev, pending: true }));

      const res = await deleteUser(userId);

      setState((prev) => ({
        ...prev,
        status: res.status,
        message: res.message,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => ({ ...prev, pending: false }));
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      if (state.status === 200) {
        toast.success(state.message, { position: "top-center" });
      } else {
        toast.error(state.message, { position: "top-center" });
      }
    }
  });

  return (
    <Button
      type="button"
      variant={"destructive"}
      size={"icon"}
      disabled={state.pending}
      onClick={() => handleDeleteUser(userId)}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteUserButton;
