import type { RegSchema } from "../schema/registerSchema";
import axios from "../../../services/axiosInstance";
import { AxiosError } from "axios";
import type { ResetPasswordConfirmType } from "../types/authTypes";

export async function resetPasswordApi(email: Pick<RegSchema, "email">) {
  try {
    const res = await axios.post("/api/auth/users/reset_password/", email);
    const data = await res.data;

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log("reset_password", e.response?.data);
    }
    throw new Error("Please try again later");
  }
}

export async function resetPasswordConfirmApi(
  resetPassword: ResetPasswordConfirmType,
) {
  try {
    const res = await axios.post(
      "/api/auth/users/reset_password_confirm/",
      resetPassword,
    );
    const data = await res.data;

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.log("reset_password_confirm", e.response?.data);
    }
    throw new Error("Please try again later");
  }
}
