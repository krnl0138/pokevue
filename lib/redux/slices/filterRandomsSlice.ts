import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchAllValue: "",
};

export const filterRandomsSlice = createSlice({
  name: "filterRandoms",
  initialState,
  reducers: {
    setFilterRandomsValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFilterRandomsValue: () => {
      return initialState;
    },
  },
});

const { actions, reducer: filterRandomsReducer } = filterRandomsSlice;
export const { setFilterRandomsValue, resetFilterRandomsValue } = actions;
export default filterRandomsReducer;
