import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface CountDownSliceInitial {
  countDownTimers: number[];
  laps: number;
}

export interface CountDownSlice extends CountDownSliceInitial {
  timeRemaining: number;
  isRuning: boolean;
  initialValues: CountDownSliceInitial;
  currentLap: number;
}

const initialCountDown = {
  timeRemaining: 20,
  isRuning: false,
  countDownTimers: [5, 10],
  initialValues: { countDownTimers: [20, 5, 10], laps: 20 },
  laps: 20,
  currentLap: 1,
} as CountDownSlice;

const countDownSlice = createSlice({
  name: "countdown",
  initialState: initialCountDown,
  reducers: {
    decrementTimeRemaining(state) {
      if (state.timeRemaining > 0 && state.isRuning) {
        state.timeRemaining--;
      } else if (
        state.timeRemaining === 0 &&
        state.countDownTimers.length > 0 &&
        state.isRuning
      ) {
        state.timeRemaining = state.countDownTimers[0];
        state.countDownTimers.shift();
      } else if (
        state.timeRemaining === 0 &&
        state.countDownTimers.length === 0 &&
        state.isRuning &&
        state.currentLap < state.laps
      ) {
        state.currentLap++;
        state.timeRemaining = state.initialValues?.countDownTimers[0] || 0;
        state.countDownTimers =
          state.initialValues?.countDownTimers.slice(1) || [];
      } else {
        state.isRuning = false;
      }
    },

    startTimer(state) {
      state.isRuning = true;
    },
    stopTimer(state) {
      state.isRuning = false;
    },
    setCountDown(state, action: PayloadAction<CountDownSliceInitial>) {
      state.initialValues = action.payload;
      state.timeRemaining = action.payload.countDownTimers[0];
      state.countDownTimers = action.payload.countDownTimers.slice(1);
      state.currentLap = 1;
      state.laps = action.payload.laps;
      state.isRuning = false;
    },
    resetCountDown(state) {
      state.timeRemaining = state.initialValues?.countDownTimers[0] || 0;
      state.countDownTimers =
        state.initialValues?.countDownTimers.slice(1) || [];

      state.currentLap = 1;
      state.laps = state.initialValues.laps;
      state.isRuning = false;
    },
  },
});
export default countDownSlice.reducer;
export const {
  setCountDown,
  stopTimer,
  startTimer,
  resetCountDown,
  decrementTimeRemaining,
} = countDownSlice.actions;
