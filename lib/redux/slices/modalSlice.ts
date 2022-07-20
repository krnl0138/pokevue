import { createSlice } from "@reduxjs/toolkit";

const initialState = { modalOpen: false, data: [] };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalOpen = true;
      state.data = action.payload;
    },
    closeModal: (state) => {
      return initialState;
    },
  },
});

export const { actions, reducer: modalReducer } = modalSlice;
export const { openModal, closeModal } = actions;
