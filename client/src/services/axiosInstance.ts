import axiosInstance, { AxiosError } from "axios";
import { refreshApi } from "../features/authentication/services/authApiServices";
const axios = axiosInstance.create({});
const axiosError = axiosInstance.isAxiosError;

//TODO:need to rethink how i manage this
axios.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error: AxiosError) {
    if (error.config?.url === "/api/auth/refresh/") {
      return Promise.reject(error);
    }

    if (error.response?.status && error.response?.status >= 403) {
      return Promise.reject(error);
    }

    const originalRequestRetry = error.config!;
    const res = await refreshApi();
    if (res) {
      const req = await axios(originalRequestRetry);
      if (req.statusText === "OK") {
        return req;
      }

      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
export { axiosError };
