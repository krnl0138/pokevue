import { createSlice } from "@reduxjs/toolkit";

export const recentSearchSlice = createSlice({
  name: "recentSearch",
  initialState: [],
  reducers: {
    addRecentCard: (state, action) => {
      state.push(action.payload);
    },
    removeRecentCard: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

const { actions, reducer: recentSearchReducer } = recentSearchSlice;
export const { addRecentCard, removeRecentCard } = actions;
export default recentSearchReducer;
