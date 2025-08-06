import { parse } from "cookie";
import axios from "./axiosInstance";
import type { RegSchema } from "@/features/authentication/schema/registerSchema";
import { AxiosError } from "axios";
import type { ActivateUser } from "@/features/authentication/types/authTypes";

async function login(credentials: RegSchema) {
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

async function registerUserApi(userData: RegSchema) {
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

async function isLoggedIn() {
  const cookie = parse(document.cookie);
  if (!cookie.logged_in) {
    await refresh();
  }
  return Boolean(cookie.logged_in) === true;
}

async function refresh() {
  try {
    await axios.post("/api/auth/refresh/");

    return true;
  } catch {
    return false;
  }
}

async function showUser() {
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
export { login, showUser, refresh, registerUserApi, isLoggedIn };
