import { type TodoData } from "@/features/todo/types/todoTypes";
import axios, { axiosError } from "./axiosInstance";

async function apiCreateTodos(todosList: TodoData) {
  try {
    const res = await axios.post("/api/todos/", todosList);
    const data = res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      throw new Error(error?.response?.data.detail);
    }
    throw new Error("Can't create todo");
  }
}

export { apiCreateTodos };
