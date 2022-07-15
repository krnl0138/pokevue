import { createSlice } from "@reduxjs/toolkit";

type initialState = [
  {
    id: null;
    isFavourite: false;
    isRecent: false;
    pokemonData: { name: ""; avatar: ""; flavors: "" };
  }
];

export const recentSearchSlice = createSlice({
  name: "recentSearch",
  initialState: [],
  reducers: {
    addRecentCard: (state, action) => {
      // doubling guard clause
      const doubleId = state.some((item) => item.id === action.payload.id);
      if (doubleId) return;

      // add no more card than the limit
      const limit = 3;
      if (state.length === limit) {
        state.splice(0, 1);
      }

      state.push(action.payload);
    },
    removeRecentCard: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer: recentSearchReducer } = recentSearchSlice;
export const { addRecentCard, removeRecentCard } = actions;
export default recentSearchReducer;
