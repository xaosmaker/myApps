import type { regSchema, resetPasswordSchema } from "../schema/authSchemas";
import { z } from "zod/v4";

export type ActivateUser = {
  uid: string;
  token: string;
};

export type RegSchema = z.infer<typeof regSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export type ResetPasswordConfirmType = ActivateUser & ResetPasswordSchema;
