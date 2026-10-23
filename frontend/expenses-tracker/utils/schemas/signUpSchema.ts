import { z } from "zod";
import type { TFunction } from "i18next";

export const createPasswordSchema = (t: TFunction) =>
  z
    .string()
    .trim()
    .min(8, { error: t("auth.validation.passwordMin") })
    .max(128, { error: t("auth.validation.passwordMax") })
    .regex(/[a-z]/, {
      error: t("auth.validation.passwordLowercase"),
    })
    .regex(/[A-Z]/, {
      error: t("auth.validation.passwordUppercase"),
    })
    .regex(/[0-9]/, {
      error: t("auth.validation.passwordDigit"),
    })
    .regex(/[^a-zA-Z0-9]/, {
      error: t("auth.validation.passwordSpecial"),
    })
    .regex(/^\S+$/, { error: t("auth.validation.passwordWhitespace") });

export const createSignUpSchema = (t: TFunction) =>
  z
    .object({
      fullname: z
        .string()
        .min(2, { error: t("auth.validation.nameMin") })
        .max(128, { error: t("auth.validation.nameMax") }),

      email: z
        .string()
        .trim()
        .min(1, { error: t("auth.validation.emailRequired") })
        .pipe(z.email({ error: t("auth.validation.emailInvalid") })),

      password: createPasswordSchema(t),
      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      error: t("auth.validation.passwordNotMatch"),
      path: ["confirmPassword"],
    });

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;
