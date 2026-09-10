import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";
import { RouteError } from "./routeError.ts";

export const authenticate: RequestHandler = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    throw new RouteError(401, "Authentication is required");
  }

  const token = authorization.substring(7);

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret is not defined");
  }

  try {
    const payload = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      issuer: "expenses-tracker-api",
      audience: "expenses-tracker-client",
    });

    if (typeof payload === "string") {
      throw new RouteError(401, "Invalid token");
    }

    const subject = payload.sub;

    if (typeof subject !== "string" || subject.length === 0) {
      throw new RouteError(401, "Invalid token");
    }

    req.user = {
      id: subject,
    };

    next();
  } catch (err) {
    if (err instanceof RouteError) {
      throw err;
    }

    throw new RouteError(401, "Invalid or expired token");
  }
};
