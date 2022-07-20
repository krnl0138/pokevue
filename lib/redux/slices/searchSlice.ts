import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSearchValue: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: searchReducer } = searchSlice;
export const { setSearchValue, resetSearchValue } = actions;
