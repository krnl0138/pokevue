import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
  avatar: "",
};

export const profileFormSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    setProfileFormValue: (state, action) => {
      console.log("payload from profileSlice: ", action.payload);
      return { ...state, ...action.payload };
    },
    resetProfileFormValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: profileFormReducer } = profileFormSlice;
export const { setProfileFormValue, resetProfileFormValue } = actions;
