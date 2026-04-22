"use client";

import { InputTypes, Routes, UserRole } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import Image from "next/image";
import FormFields from "../FormFields/FormFields";
import { Button } from "../ui/button";
import { useActionState, useEffect, useState } from "react";
import { ValidationErrors } from "@/validations/auth";
import { updateProfile } from "./_actions/profile";
import Loader from "../Loader";
import { CameraIcon } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const EditUserForm = ({
  translations,
  user,
}: {
  translations: Translations;
  user: Session["user"];
}) => {
  const { getFormFields } = useFormFields({
    slug: Routes.PROFILE,
    translations,
  });

  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData,
  };

  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);

  const [selectedImage, setSelectedImage] = useState(user.image ?? "");

  const [state, action, pending] = useActionState(
    updateProfile.bind(null, isAdmin),
    initialState,
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      if (state.status === 200) {
        toast.success(state.message, { position: "top-center" });
      } else {
        toast.error(state.message, { position: "top-center" });
      }
    }
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedImage(user.image as string);
  }, [user.image]);

  const session = useSession();

  return (
    <form className="flex flex-col md:flex-row gap-10" action={action}>
      <div className="group relative w-50 h-50 overflow-hidden rounded-full mx-auto">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full object-cover w-50 h-50"
          />
        )}

        <div
          className={`${
            selectedImage
              ? "group-hover:opacity-50 opacity-0 transition-opacity duration-200"
              : ""
          } absolute top-0 left-0 w-full h-full bg-card/50`}
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>

      <div className="card flex-1 grid gap-6">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);

          return (
            <FormFields
              key={field.name}
              {...field}
              defaultValue={fieldValue as string}
              error={state?.error}
              readOnly={field.type === InputTypes.EMAIL}
            />
          );
        })}

        {session.data?.user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2">
            <Label htmlFor="check" className="cursor-pointer!">
              Admin
            </Label>

            <Checkbox
              id="check"
              name="admin"
              checked={isAdmin}
              onClick={() => setIsAdmin(!isAdmin)}
            />
          </div>
        )}

        <Button type="submit" className="w-full rounded-lg" disabled={pending}>
          {pending ? <Loader /> : translations.save}
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;

const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setSelectedImage(url);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleImageChange}
        name="image"
      />

      <label
        htmlFor="image-upload"
        className="border border-border rounded-full w-50 h-50 element-center cursor-pointer"
      >
        <CameraIcon className="w-8! h-8! text-accent" />
      </label>
    </>
  );
};
