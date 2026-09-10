import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import User from "../models/User.ts";
import { RouteError } from "../utils/routeError.ts";
import { hashPassword } from "../services/passwordServices.ts";

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
  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    throw new RouteError(400, "All fields are required");
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new RouteError(409, "Email is already registered");
  }

  const passwordHash = await hashPassword(password);

  const user = await User.create({
    fullName,
    email,
    passwordHash,
    profileImageUrl,
  });

  const userId = user._id.toString();
  const token = generateToken(userId);

  res.status(201).json({
    user: publicUser(user),
    token,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new RouteError(400, "All fields are required");
  }

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !(await user.comparePassword(password))) {
    throw new RouteError(401, "Invalid credentials");
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
    throw new RouteError(404, "No user found");
  }

  res.status(200).json({
    user: publicUser(user),
  });
};
