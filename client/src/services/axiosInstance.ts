import axiosInstance from "axios";
import { store } from "../store/store";
import { logOut } from "../store/authSlice";
import { refresh } from "./authApiCalls";
const axios = axiosInstance.create({});

const wrongCredentials = "No active account found with the given credentials";
const authCredNotProvided = "Authentication credentials were not provided.";
const tokenRefreshSuccessfull = "Access tokens refresh successfully.";
const noToken = "This field is required.";
const invalidToken = "Given token not valid for any token type";

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    const originalRequestRetry = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.detail === wrongCredentials
    ) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      error.response.data.detail === invalidToken
    ) {
      const res = await refresh();
      if (res.message === tokenRefreshSuccessfull) {
        originalRequestRetry.retry = true;
        return axios(originalRequestRetry);
      }
      store.dispatch(logOut());
    }
    if (
      error.response.status === 401 &&
      error.response.data.detail === authCredNotProvided
    ) {
      const res = await refresh();
      if (res.message === tokenRefreshSuccessfull) {
        originalRequestRetry.retry = true;
        return axios(originalRequestRetry);
      }
      store.dispatch(logOut());
    }

    if (
      error.response.status === 400 &&
      error.response.data.refresh[0] === noToken
    ) {
      store.dispatch(logOut());
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
