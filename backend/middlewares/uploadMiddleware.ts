import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import path from "node:path";
import crypto from "node:crypto";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = ["/image.jpeg", "/image.png", "/image.svg+xml"];

  const allowedExtensions = [".jpeg", ".jpg", ".png", ".svg"];

  const extension = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) &&
    allowedExtensions.includes(extension)
  ) {
    cb(null, true);
    return;
  } else {
    cb(new Error("Invalid file type"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1,
  },
});
