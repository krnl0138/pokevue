import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
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

const { actions, reducer: searchReducer } = searchSlice;
export const { setSearchValue, resetSearchValue } = actions;
export default searchReducer;
