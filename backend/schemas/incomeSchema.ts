import { z } from "zod";

export const incomeValidation = z.object({
  icon: z.string().optional(),

  source: z
    .string()
    .trim()
    .min(1, { error: "Income source is required" })
    .max(120, { error: "Income source is too long" }),

  amount: z.number().positive("Amount must be greater than zero"),

  date: z.coerce.date(),
});
