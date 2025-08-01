import { z } from "zod/v4";

export const regSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(8, "Password should be 8 or more chars")
      .refine(
        (data) => /[A-Z]/.test(data),
        "Password should contain one Cappital letter",
      )
      .refine(
        (data) => /[1-9]/.test(data),
        "Password should contain one number",
      ),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords Mismatch",
      });
    }
  });

export type RegSchema = z.infer<typeof regSchema>;
