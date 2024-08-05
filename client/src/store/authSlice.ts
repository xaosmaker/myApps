import { createSlice } from "@reduxjs/toolkit";
export interface authSlice {
  isLoggedIn: boolean;
}

const initialAuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
