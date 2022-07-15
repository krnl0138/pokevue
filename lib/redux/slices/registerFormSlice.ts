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
      state = { ...state, ...action.payload };
    },
  },
});

export const { actions, reducer: registerFormReducer } = registerFormSlice;
export const { setRegisterFormValue } = actions;
export default registerFormReducer;
