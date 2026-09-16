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
import { processFileImage } from "../utils/processFileImage.ts";

const router = express.Router();

router.post("/register", validateBody(registerSchema), registerUser);
router.post("/login", validateBody(loginSchema), loginUser);
router.post(
  "/upload-file",
  authenticate,
  upload.single("image"),
  processFileImage,
);

router.get("/getUser", authenticate, getUserInfo);

export default router;
