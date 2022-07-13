import { createSlice } from "@reduxjs/toolkit";

export const recentSearchSlice = createSlice({
  name: "recentSearch",
  initialState: [],
  reducers: {
    addRecentCard: (state, action) => {
      state.push(action.payload);
    },
    removeRecentCard: (state, action) => {
      state.filter((card, i) => i !== action.payload.index);
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer: recentSearchReducer } = recentSearchSlice;
// Extract and export each action creator by name
export const { addRecentCard, removeRecentCard } = actions;
// Export the reducer, either as a default or named export
export default recentSearchReducer;
