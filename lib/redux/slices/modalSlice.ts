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
      state = initialState;
    },
  },
});

export const { actions, reducer: modalReducer } = modalSlice;
export const { openModal, closeModal } = actions;
export default modalReducer;
