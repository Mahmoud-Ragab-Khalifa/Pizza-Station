"use client";

import { CameraIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className="group mx-auto md:mx-0 relative w-50 h-50 overflow-hidden rounded-full">
      {/* <Image
        src={selectedImage}
        alt={"Add Product Image"}
        width={200}
        height={200}
        className="rounded-full w-50 h-50 object-cover"
      /> */}

      <div
        className={`${selectedImage ? "group-hover:opacity-100 opacity-0 transition-opacity duration-200" : ""} absolute top-0 left-0 w-full h-full bg-card/50`}
      >
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image-upload"
          className="hidden"
          onChange={handleImageChange}
        />

        <label
          htmlFor="image-upload"
          className="w-50 h-50 element-center rounded-full border cursor-pointer"
        >
          <CameraIcon className="text-accent" />
        </label>
      </div>
    </div>
  );
};

export default UploadImage;
