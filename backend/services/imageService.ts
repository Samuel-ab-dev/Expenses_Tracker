import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { processFileImage } from "../utils/processFileImage.ts";

const uploadDirectory = path.join(process.cwd(), "uploads", "profile-images");

export const saveProfileImages = async (
  buffer: Buffer,
  imageBaseUrl: string,
) => {
  const image = await processFileImage(buffer);

  await fs.mkdir(uploadDirectory, {
    recursive: true,
  });

  const filename = `${crypto.randomUUID()}.webp`;
  const filePath = path.join(uploadDirectory, filename);

  await fs.writeFile(filePath, image);

  return {
    filePath,
    filename,
    imageUrl: `${imageBaseUrl}/uploads/profile-images/${filename}`,
  };
};

export const deleteProfileImages = async (filename: string) => {
  const filePath = path.join(uploadDirectory, filename);

  await fs.unlink(filePath).catch(() => {});
};
