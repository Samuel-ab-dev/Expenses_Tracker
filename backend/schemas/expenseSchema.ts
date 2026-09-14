import { z } from "zod";

export const expenseValidation = z.object({
  icon: z.string().optional(),

  category: z
    .string()
    .trim()
    .min(1, { error: "Expense category is required" })
    .max(120, { error: "Expense category is too long" }),

  amount: z.number().positive("Amount must be greater than zero"),

  date: z.coerce.date(),
});
