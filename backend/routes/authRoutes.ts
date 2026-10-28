import express from "express";
import { validateBody } from "../middlewares/validateMiddleware.ts";
import {
  loginSchema,
  registerSchema,
  updateLocaleSchema,
} from "../schemas/authSchema.ts";
import {
  registerUser,
  loginUser,
  getUserInfo,
  uploadProfileImage,
  updateUserLocale,
} from "../controllers/authController.ts";
import { authenticate } from "../utils/requestHandler.ts";
import { upload } from "../middlewares/uploadMiddleware.ts";

const router = express.Router();

router.post(
  "/register",
  upload.single("image"),
  validateBody(registerSchema),
  registerUser,
);
router.post("/login", validateBody(loginSchema), loginUser);
router.post(
  "/upload-file",
  authenticate,
  upload.single("image"),
  uploadProfileImage,
);

router.get("/getUser", authenticate, getUserInfo);

router.patch(
  "/locale",
  authenticate,
  validateBody(updateLocaleSchema),
  updateUserLocale,
);

export default router;
