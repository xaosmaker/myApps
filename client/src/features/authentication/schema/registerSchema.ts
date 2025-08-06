import { z } from "zod/v4";

export const regSchema = z
  .object({
    username: z.string(),
    first_name: z.string(),
    last_name: z.string(),

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
    re_password: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.re_password !== data.password) {
      ctx.addIssue({
        path: ["re_password"],
        code: "custom",
        message: "Passwords Mismatch",
      });
    }
  });

export type RegSchema = z.infer<typeof regSchema>;
