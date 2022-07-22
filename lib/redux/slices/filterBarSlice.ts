import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  filterValue: "",
};

export const filterBarSlice = createSlice({
  name: "filterBar",
  initialState,
  reducers: {
    setFilterBarValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilterBarValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: filterBarReducer } = filterBarSlice;
export const { setFilterBarValue, resetFilterBarValue } = actions;

export const selectFilterBarValue = (state: RootState) =>
  state.filterBar.filterValue;
