import type { ResetPasswordSchema } from "../schema/registerSchema";

export type ActivateUser = {
  uid: string;
  token: string;
};

export type ResetPasswordConfirmType = ActivateUser & ResetPasswordSchema;
