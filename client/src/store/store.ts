import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import todoSlice from "./todoSlice";

export const store = configureStore({
  reducer: {
    authentication: authSlice,
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
