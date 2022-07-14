import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

export const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setLoginFormValue: (state, actions) => {
      state = { ...state, ...actions.payload };
    },
  },
});

export const { actions, reducer: loginFormReducer } = loginFormSlice;
export const { setLoginFormValue } = actions;
export default loginFormReducer;
