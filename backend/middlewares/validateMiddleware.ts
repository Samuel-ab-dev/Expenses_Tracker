import type { RequestHandler } from "express";
import { z } from "zod";

export const validateBody = <T extends z.ZodType>(
  schema: T,
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }

    req.body = result.data;
    next();
  };
};
