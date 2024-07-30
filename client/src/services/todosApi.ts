import { TodoData } from "../types/dataTypes";
import axios from "./axiosInstance";

async function apiTodosList() {
  try {
    const res = await axios.get("/api/todos/");
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("404 page not found");
    }
    if (error.response.data.detail) {
      throw new Error(error.response.data.detail);
    }
    return error.response;
  }
}
async function apiTodo(pkid: string | undefined) {
  try {
    const res = await axios.get(`/api/todos/${pkid}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("404 page not found");
    }
    if (error.response.data.detail) {
      throw new Error(error.response.data.detail);
    }
    return error.response;
  }
}
async function apiCreateTodos(todosList: TodoData) {
  try {
    const res = await axios.post("/api/todos/", todosList);
    const data = res.data;
    return data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
}

export { apiTodosList, apiCreateTodos, apiTodo };
