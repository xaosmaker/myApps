import { LoginFormValues } from "../types/formtypes";
import axios from "./axiosInstance";

async function login(credentials: LoginFormValues) {
  try {
    const res = await axios.post("/api/auth/login/", credentials);
    const data = await res.data;
    return data;
  } catch (e) {
    throw new Error(e.response.data.detail);
  }
}

async function refresh() {
  try {
    const res = await axios.post("/api/auth/refresh/");
    const data = await res.data;
    return data;
  } catch (e) {
    return e.response;
  }
}

async function showUser() {
  try {
    const res = await axios.get("/api/auth/users/me/");
    const data = await res.data;
    return data;
  } catch (error) {
    return error.response;
  }
}
export { login, showUser, refresh };
