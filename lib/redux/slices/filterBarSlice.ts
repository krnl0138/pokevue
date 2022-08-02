import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  filterValue: "",
  isFailed: false,
  isLoading: false,
};

export const filterBarSlice = createSlice({
  name: "filterBar",
  initialState,
  reducers: {
    setFilterBarValue: (state, action: PayloadAction<string>) => {
      state.filterValue = action.payload;
    },
    setFilterBarPending: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFilterBarFailed: (state) => {
      state.isFailed = true;
      state.isLoading = false;
    },
    resetFilterBarValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: filterBarReducer } = filterBarSlice;
export const {
  setFilterBarValue,
  setFilterBarFailed,
  setFilterBarPending,
  resetFilterBarValue,
} = actions;

export const selectFilterBarValue = (state: RootState) =>
  state.filterBar.filterValue;
export const selectFilterBarFailed = (state: RootState) =>
  state.filterBar.isFailed;
export const selectFilterBarLoading = (state: RootState) =>
  state.filterBar.isLoading;
