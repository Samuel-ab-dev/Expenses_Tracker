import { RouteError } from "../utils/routeError.ts";
import fs from "node:fs/promises";
import path from "node:path";
import type { Request, Response } from "express";
import { processFileImage } from "../utils/processFileImage.ts";

export const profileImage = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new RouteError(400, "No file uploaded");
  }

  try {
    const image = await processFileImage(req.file.buffer);

    const filename = `${crypto.randomUUID()}.webp`;

    const uploadDirectory = path.resolve("uploads");

    await fs.mkdir(uploadDirectory, {
      recursive: true,
    });

    const filePath = path.join(uploadDirectory, filename);

    await fs.writeFile(filePath, image);

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

    res.status(200).json({ message: "Filed uploaded successfully!", imageUrl });
  } catch {
    throw new RouteError(400, "Invalid image format");
  }
};
