import type { ErrorRequestHandler } from "express";
import { RouteError } from "./routeError.ts";

export const ErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  if (err instanceof RouteError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: "Internal server error",
  });
};
