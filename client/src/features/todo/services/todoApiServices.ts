import { AxiosError } from "axios";
import axios from "../../../services/axiosInstance";

export async function getTodosListApi(queryParams: string = "") {
  try {
    const res = await axios.get(`/api/todos/${queryParams}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error("404 page not found");
      }
      if (error.response?.data.detail) {
        throw new Error(error.response.data.detail);
      }
      return error.response;
    }
    throw new Error(`Can't get todo list`);
  }
}
