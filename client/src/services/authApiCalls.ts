import { parse } from "cookie";
import axios, { axiosError } from "./axiosInstance";
import type { RegSchema } from "@/features/authentication/schema/registerSchema";

async function login(credentials: RegSchema) {
  try {
    const res = await axios.post("/api/auth/login/", credentials);
    const data = await res.data;
    return data;
  } catch (e) {
    if (axiosError(e)) {
      throw new Error(e.response?.data.detail);
    }
    throw new Error("something went wrong");
  }
}

export async function isLoggedIn() {
  const cookie = parse(document.cookie);
  if (!cookie.logged_in) {
    await refresh();
  }
  return Boolean(cookie.logged_in) === true;
}

async function refresh() {
  try {
    const res = await axios.post("/api/auth/refresh/");

    console.log(res);

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
    if (axiosError(error)) {
      return error.response;
    }
    throw new Error("something went wrong");
  }
}
export { login, showUser, refresh };
