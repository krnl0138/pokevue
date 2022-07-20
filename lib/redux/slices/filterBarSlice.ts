import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterValue: "",
};

export const filterBarSlice = createSlice({
  name: "filterBar",
  initialState,
  reducers: {
    setFilterBarValue: (state, action) => {
      console.log("payload: ", action);
      return { ...state, ...action.payload };
    },
    resetFilterBarValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: filterBarReducer } = filterBarSlice;
export const { setFilterBarValue, resetFilterBarValue } = actions;
