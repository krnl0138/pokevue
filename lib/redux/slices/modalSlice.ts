import { createSlice } from "@reduxjs/toolkit";

const initialState = { modalOpen: false, data: [] };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      state.modalOpen = true;
      state.data = actions.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.data = initialState.data;
    },
  },
});

export const { actions, reducer: modalReducer } = modalSlice;
export const { openModal, closeModal } = actions;
export default modalReducer;
