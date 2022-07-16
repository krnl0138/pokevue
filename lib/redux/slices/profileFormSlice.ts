import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
  file: "",
};

export const profileFormSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    setProfileFormValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetProfileFormValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: profileFormReducer } = profileFormSlice;
export const { setProfileFormValue, resetProfileFormValue } = actions;
export default profileFormReducer;
