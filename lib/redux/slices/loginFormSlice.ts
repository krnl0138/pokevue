import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  email: "",
  password: "",
};

export const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setLoginFormValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetLoginFormValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: loginFormReducer } = loginFormSlice;
export const { setLoginFormValue, resetLoginFormValue } = actions;

export const selectLoginForm = (state: RootState) => state.loginForm;
