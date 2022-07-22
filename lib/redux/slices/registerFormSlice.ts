import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  email: "",
  username: "",
  password: "",
};

export const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    setRegisterFormValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetRegisterFormValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: registerFormReducer } = registerFormSlice;
export const { setRegisterFormValue, resetRegisterFormValue } = actions;

export const selectRegisterForm = (state: RootState) => state.registerForm;
