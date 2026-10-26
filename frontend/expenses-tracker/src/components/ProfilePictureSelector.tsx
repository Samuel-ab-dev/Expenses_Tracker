import React, { useEffect, useMemo, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

type ImageData = {
  image: File | null;
  setImage: (file: File | null) => void;
};

const ProfilePictureSelector = ({ image, setImage }: ImageData) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <section className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 dark:bg-gray-800">
          <LuUser className="text-4xl text-primary" />

          <button
            type="button"
            className="absolute -bottom-1 -right-1
              flex h-8 w-8 cursor-pointer items-center justify-center
              rounded-full bg-primary text-violet-50
              transition-colors hover:bg-violet-700
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-violet-500
              dark:hover:bg-violet-400 dark:hover:text-gray-950"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl ?? undefined}
            alt="Profile Picture Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1
              flex h-8 w-8 cursor-pointer items-center justify-center
              rounded-full bg-red-600 text-red-50
              transition-colors hover:bg-red-700
              focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-red-500
              dark:bg-red-500 dark:hover:bg-red-400
              dark:hover:text-gray-950"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProfilePictureSelector;
