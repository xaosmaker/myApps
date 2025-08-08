import { AxiosError } from "axios";
import axios from "../../../services/axiosInstance";
import type { TodoData, TodoTaskData } from "../types/todoTypes";

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

export async function getSingleTodoApi(pkid: string | undefined) {
  try {
    const res = await axios.get(`/api/todos/${pkid}`);
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
    throw new Error(`Can't get todo wiht id ${pkid}`);
  }
}

export async function deleteTodoItemApi(pkid: number) {
  try {
    const res = await axios.delete(`/api/todo-tasks/${pkid}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Can't delete todoTasks");
  }
}
// this api call is only used to update the todo item to finish
export async function finishTodoItemApi(todosList: TodoTaskData) {
  todosList.is_completed = true;
  try {
    const res = await axios.patch(
      `/api/todo-tasks/${todosList.pkid}/`,
      todosList,
    );
    const data = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Can't create todoTasks");
  }
}

export async function createTodoItemApi(todosList: TodoData) {
  try {
    const res = await axios.patch(`/api/todos/${todosList.pkid}/`, todosList);
    const data = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Can't create todoTasks");
  }
}
