import { LoginFormValues } from "../types/formtypes";
import axios, { axiosError } from "./axiosInstance";

async function login(credentials: LoginFormValues) {
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

async function refresh() {
  try {
    const res = await axios.post("/api/auth/refresh/");
    const data = await res.data;
    return data;
  } catch (e) {
    if (axiosError(e)) {
      return e.response;
    }
    throw new Error("something went wrong");
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
