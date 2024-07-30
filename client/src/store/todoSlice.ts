import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoData, TodoTaskData } from "../types/dataTypes";

const initialTodoState: TodoData = {
  pkid: -1,
  title: "",
  expired: false,
  completed: false,
  completed_in_time: false,
  complete_until: Date.now().toLocaleString(),
  todo_tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialTodoState,
  reducers: {
    addTodoTask: (state, action: PayloadAction<string>) => {
      const todoTask: TodoTaskData = {
        name: action.payload,
        is_completed: false,
      };
      state.todo_tasks.push(todoTask);
      state.todo_tasks = sortTodo(state.todo_tasks);
    },
    removeTodoTask: (state, action: PayloadAction<string>) => {
      state.todo_tasks = state.todo_tasks.filter(
        (data) => data.name !== action.payload
      );
      state.todo_tasks = sortTodo(state.todo_tasks);
    },
    setTodoState: (state, action: PayloadAction<TodoData>) => {
      const ac = action.payload;
      state.pkid = ac.pkid;
      state.title = ac.title;
      state.completed = ac.completed;
      state.completed = ac.completed_in_time;
      state.complete_until = ac.complete_until;
      state.todo_tasks = [...action.payload.todo_tasks];
    },
  },
});

function sortTodo(data: TodoTaskData[]) {
  return [...data].sort(
    (a, b) => Number(a.is_completed) - Number(b.is_completed)
  );
}

export default todoSlice.reducer;
export const { setTodoState, removeTodoTask, addTodoTask } = todoSlice.actions;
