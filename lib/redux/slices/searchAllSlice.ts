import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchAllValue: "",
};

export const searchAllSlice = createSlice({
  name: "searchAll",
  initialState,
  reducers: {
    setSearchAllValue: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSearchAllValue: () => {
      return initialState;
    },
  },
});

const { actions, reducer: searchAllReducer } = searchAllSlice;
export const { setSearchAllValue, resetSearchAllValue } = actions;
export default searchAllReducer;
