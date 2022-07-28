import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  commentText: "",
};

export const commmentFormSlice = createSlice({
  name: "commentForm",
  initialState,
  reducers: {
    setCommentFormValue: (state, action: PayloadAction<string>) => {
      state.commentText = action.payload;
    },
    resetCommentFormValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: commentFormReducer } = commmentFormSlice;
export const { setCommentFormValue, resetCommentFormValue } = actions;

export const selectFilterBarValue = (state: RootState) =>
  state.commentForm.commentText;
