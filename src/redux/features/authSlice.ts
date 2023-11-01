import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  isModerator: boolean;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isModerator: false,
  } as AuthState,
} as InitialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    test: (state, action) => initialState,
  },
});

export const { test } = authSlice.actions;
export default authSlice.reducer;
