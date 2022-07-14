import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

const { actions, reducer: searchReducer } = searchSlice;
export const { setSearchValue } = actions;
export default searchReducer;
