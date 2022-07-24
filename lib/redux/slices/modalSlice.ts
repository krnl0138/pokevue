import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = { isModalOpen: false, data: {} };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.data = action.payload;
    },
    closeModal: (state) => {
      return initialState;
    },
  },
});

export const { actions, reducer: modalReducer } = modalSlice;
export const { openModal, closeModal } = actions;

export const selectModalData = (state: RootState) => state.modal.data;
export const selectModalStatus = (state: RootState) => state.modal.isModalOpen;
