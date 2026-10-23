import type { TFunction } from "i18next";
import { z } from "zod";

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, { error: t("auth.validation.emailRequired") })
      .pipe(z.email({ error: t("auth.validation.emailInvalid") })),

    password: z
      .string()
      .trim()
      .min(1, { error: t("auth.validation.passwordRequired") }),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
