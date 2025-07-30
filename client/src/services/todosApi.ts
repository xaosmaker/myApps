import { type TodoData } from "../types/dataTypes";
import axios, { axiosError } from "./axiosInstance";

async function apiTodosList(queryParams: string = "") {
  try {
    const res = await axios.get(`/api/todos/${queryParams}`);
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
    throw new Error(`Can't get todo list`);
  }
}
async function apiTodo(pkid: string | undefined) {
  try {
    const res = await axios.get(`/api/todos/${pkid}`);
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
    throw new Error(`Can't get todo wiht id ${pkid}`);
  }
}
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

async function apiPatchTodos(todosList: TodoData) {
  try {
    const res = await axios.patch(`/api/todos/${todosList.pkid}/`, todosList);
    const data = res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Can't create todoTasks");
  }
}
async function apiDeleteTodoTask(pkid: number) {
  try {
    const res = await axios.delete(`/api/todo-tasks/${pkid}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Can't delete todoTasks");
  }
}

export {
  apiTodosList,
  apiCreateTodos,
  apiTodo,
  apiPatchTodos,
  apiDeleteTodoTask,
};
