import axios from "axios";
import { axiosError } from "./axiosInstance";

async function basePost(url: string, diaryData: object, errorMessage: string) {
  try {
    const res = await axios.post(url, diaryData);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("404 page not found");
      }
      if (error.response?.data.detail) {
        throw new Error(error.response.data.detail);
      }
      return error.response;
    }
    throw new Error(errorMessage);
  }
}

async function baseGet(
  url: string,
  queryParams: string = "",
  errorMessage: string = ""
) {
  try {
    const res = await axios.get(`${url}${queryParams}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("404 page not found");
      }
      if (error.response?.data.detail) {
        throw new Error(error.response.data.detail);
      }
      return error.response;
    }
    throw new Error(errorMessage);
  }
}

export { basePost, baseGet };
