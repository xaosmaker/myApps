import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import countDownslice from "./countDownslice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    countDown: countDownslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
