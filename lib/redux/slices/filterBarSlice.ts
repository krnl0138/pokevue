import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const filterBarSlice = createSlice({
  name: "filterBar",
  initialState,
  reducers: {
    setFilterBarValue: (state, action) => {
      state.value = action.payload;
    },
    resetFilterBarValue: () => {
      return initialState;
    },
  },
});

export const { reducer: filterBarReducer } = filterBarSlice;
export const { setFilterBarValue, resetFilterBarValue } =
  filterBarSlice.actions;
