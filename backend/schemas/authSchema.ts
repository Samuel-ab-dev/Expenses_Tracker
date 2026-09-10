import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { error: "Name must be at least 2 characters long" })
    .max(128, { error: "Name can't exceed 128 characters" }),

  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required" })
    .toLowerCase()
    .pipe(z.email({ error: "Invalid email address" })),

  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(128, { error: "Password can't be longer than 128 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase character",
    })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase character",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one digit (0-9)" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character",
    })
    .regex(/^\S+$/, { error: "Password cannot contain whitespaces" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Invalid email address" })),

  password: z.string().min(1, { error: "Password is required" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
