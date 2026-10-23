import jwt from "jsonwebtoken";
import User from "../models/User.ts";
import fs from "node:fs/promises";
import path from "node:path";
import { RouteError } from "../utils/routeError.ts";
import { hashPassword } from "../services/passwordServices.ts";
import type { Request, Response } from "express";
import {
  deleteProfileImages,
  saveProfileImages,
} from "../services/imageService.ts";

//generating web token

const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ sub: userId }, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "expenses-tracker-api",
    audience: "expenses-tracker-client",
  });
};

const publicUser = (user: InstanceType<typeof User>) => {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new RouteError(400, "All fields are required", "REQUIRED_FIELDS");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new RouteError(
      409,
      "Email is already registered",
      "EMAIL_ALREADY_REGISTERED",
    );
  }

  const passwordHash = await hashPassword(password);

  let imageUrl: string | null = null;
  let imageFilePath: string | null = null;

  try {
    if (req.file) {
      const savedImage = await saveProfileImages(
        req.file.buffer,
        `${req.protocol}://${req.get("host")}`,
      );

      imageFilePath = savedImage.filePath;
      imageUrl = savedImage.imageUrl;
    }

    const user = await User.create({
      fullName,
      email,
      passwordHash,
      profileImageUrl: imageUrl,
    });

    const userId = user._id.toString();

    const token = generateToken(userId);

    res.status(201).json({
      user: publicUser(user),
      token,
    });
  } catch (err) {
    if (imageFilePath) {
      await fs.unlink(imageFilePath).catch(() => {});
    }
    throw err;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new RouteError(400, "All fields are required", "REQUIRED_FIELDS");
  }

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await user.comparePassword(password))) {
    throw new RouteError(401, "Invalid credentials", "INVALID_CREDENTIALS");
  }

  const userId = user._id.toString();
  const token = generateToken(userId);

  res.status(200).json({
    user: publicUser(user),
    token,
  });
};

export const getUserInfo = async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new RouteError(404, "No user found", "NO_USER_FOUND");
  }

  res.status(200).json({
    user: publicUser(user),
  });
};

export const uploadProfileImage = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new RouteError(400, "No file uploaded", "NO_FILE_UPLOADED");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new RouteError(404, "No user found", "NO_USER_FOUND");
  }

  const oldProfileImageFilename = (imageUrl: string | null) => {
    if (!imageUrl) {
      return null;
    }

    return path.basename(new URL(imageUrl).pathname);
  };

  const oldImageFilename = oldProfileImageFilename(user.profileImageUrl);

  let newImageFilePath: string | null = null;

  try {
    const savedImage = await saveProfileImages(
      req.file.buffer,
      `${req.protocol}://${req.get("host")}`,
    );

    newImageFilePath = savedImage.filePath;

    user.profileImageUrl = savedImage.imageUrl;

    await user.save();

    if (oldImageFilename) {
      await deleteProfileImages(oldImageFilename);
    }

    res.status(200).json({
      message: "PROFILE_IMAGE_UPLOADED",
      imageUrl: savedImage.imageUrl,
    });
  } catch (err) {
    if (newImageFilePath) {
      await fs.unlink(newImageFilePath).catch(() => {});
    }
    throw err;
  }
};
