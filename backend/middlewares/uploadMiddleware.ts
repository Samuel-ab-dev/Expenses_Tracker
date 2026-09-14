import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import path from "node:path";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/wepb",
  ];

  const allowedExtensions = [".jpeg", ".jpg", ".png", ".svg", ".wepb"];

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
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});
