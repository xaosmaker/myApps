import axiosInstance, { AxiosError } from "axios";
import { refresh } from "./authApiCalls";
const axios = axiosInstance.create({});
const axiosError = axiosInstance.isAxiosError;


axios.interceptors.response.use(
  function(res) {
    return res;
  },
  async function(error: AxiosError) {

    if (error.config?.url === "/api/auth/refresh/") {


      return Promise.reject(error)
    }

    const originalRequestRetry = error.config!;
    const res = await refresh();
    if (res) {
      const req = await axios(originalRequestRetry);
      if (req.statusText === "OK") {

        return req
      }


      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default axios;
export { axiosError };
