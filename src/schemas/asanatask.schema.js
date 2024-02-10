import { z } from "zod";

export const createAsanaTaskSchema = z.object({
  gid: z.string({
    required_error: "Asana ID is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
  customer: z.string({
    required_error: "Customer is required",
  }),
  description: z.string().optional(),
  actual_hours: z.string().optional(),
});
