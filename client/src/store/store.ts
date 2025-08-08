import { configureStore } from "@reduxjs/toolkit";
import countDownslice from "./countDownslice";

export const store = configureStore({
  reducer: {
    countDown: countDownslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
