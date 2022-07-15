import { createSlice } from "@reduxjs/toolkit";

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
export default registerFormReducer;
