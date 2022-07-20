import { createSlice } from "@reduxjs/toolkit";

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
