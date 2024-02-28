import { z } from "zod";

export const ExpensesSchema = z
  .object({
    id: z.number(),
    merchant: z.string(),
    description: z.string(),
    amount: z.number(),
    // We can use zod to transform the date into a more readable format
    date: z.string().transform((val) => new Date(val).toLocaleDateString()),                        
    category: z.string(),
    status: z.string(),
  })
  .array();
