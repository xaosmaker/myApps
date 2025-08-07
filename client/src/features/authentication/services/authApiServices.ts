import type {
  ActivateUser,
  RegSchema,
  ResetPasswordConfirmType,
} from "../types/authTypes";
import axios from "../../../services/axiosInstance";
import { AxiosError } from "axios";

import { parse } from "cookie";

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

export async function loginApi(credentials: RegSchema) {
  try {
    const res = await axios.post("/api/auth/login/", credentials);
    const data = await res.data;

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.detail);
    }
    throw new Error("something went wrong");
  }
}
export async function activateUserApi(userActivetionCode: ActivateUser) {
  try {
    const res = await axios.post(
      "/api/auth/users/activation/",
      userActivetionCode,
    );
    const data = await res.data;

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.detail === "Stale token for given user.") {
        throw new Error("User is Already Activated");
      }

      if (e.response?.data?.token[0] === "Invalid token for given user.") {
        throw new Error("Pls contact admin to open your account");
      }
    }
    throw new Error("Please try again later");
  }
}

export async function registerUserApi(userData: RegSchema) {
  try {
    const res = await axios.post("/api/auth/users/", userData);
    const data = await res.data;
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      let error = "";
      if (e.response?.data) {
        for (const [key, val] of Object.entries(e.response.data)) {
          error += key + ": ";
          if (Array.isArray(val)) {
            error += val.toString() + "\n";
          } else {
            error += `${val}\n`;
          }
        }
      }
      throw new Error(error);
    }
    throw new Error("something went wrong");
  }
}

export async function isLoggedInApi() {
  const cookie = parse(document.cookie);
  if (!cookie.logged_in) {
    await refreshApi();
  }
  return Boolean(cookie.logged_in) === true;
}

export async function refreshApi() {
  try {
    await axios.post("/api/auth/refresh/");

    return true;
  } catch {
    return false;
  }
}

export async function showUserApi() {
  try {
    const res = await axios.get("/api/auth/users/me/");
    const data = await res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response;
    }
    throw new Error("something went wrong");
  }
}
