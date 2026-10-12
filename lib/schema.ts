import { z } from "zod";

// Order validation schema - used by both client form and server endpoint
export const orderSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  phone: z
    .string()
    .regex(/^(09\d{8}|\+2519\d{8})$/, "Use 09... or +2519... format"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
