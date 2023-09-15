import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/)
      .nonempty({ message: "Required" }),
    "confirm-password": z
      .string()
      .nonempty({ message: "Fill this field to confirm your password" }),
  })
  .refine((data) => data.password === data["confirm-password"], {
    message: "Both password aren't identical",
  });
