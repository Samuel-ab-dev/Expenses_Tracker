import express from "express";
import { validateBody } from "../middlewares/validateMiddleware.ts";
import { loginSchema, registerSchema } from "../schemas/authSchema.ts";
import {
  registerUser,
  loginUser,
  getUserInfo,
} from "../controllers/authController.ts";
import { authenticate } from "../utils/requestHandler.ts";
import { upload } from "../middlewares/uploadMiddleware.ts";
import { RouteError } from "../utils/routeError.ts";
import sharp from "sharp";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.get("/getUser", authenticate, getUserInfo);

router.post(
  "/upload-file",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      throw new RouteError(400, "No file uploaded");
    }

    try {
      const image = await sharp(req.file.buffer)
        .resize(512, 512, {
          fit: "cover",
        })
        .webp({
          quality: 85,
        })
        .toBuffer();
      res.status(200).json({ message: "Filed uploaded successfully!" });
    } catch {
      throw new RouteError(400, "Invalid image format");
    }
  },
);

export default router;
