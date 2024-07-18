import { z } from "zod";

export const CreateExpenseValidator = z.object({
  amount: z.string(),
  description: z.string().min(3, "Description should atleast have 2 letters"),
});
