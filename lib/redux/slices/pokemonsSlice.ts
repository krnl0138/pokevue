import { createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../../utils/types";

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: <Pokemon[]>[],
  reducers: {
    addPokemon: (state, action: { payload: Pokemon }) => {
      // doubling guard clause
      if (state.some((item) => item.id === action.payload.id)) return;
      state.push(action.payload);
    },
    toggleFavouritePokemon: (state, action: { payload: number }) => {
      const find = state.find((item) => item.id === action.payload);
      if (find) find.isFavourite = !find.isFavourite;
    },
    toggleRecentPokemon: (state, action: { payload: number }) => {
      // if more than limit remove the oldest one
      const limit = 3;
      const recents = state.filter((item) => item.isRecent === true);
      if (recents.length === limit) recents[0].isRecent = false;

      const find = state.find((item) => item.id === action.payload);
      if (find) find.isRecent = !find.isRecent;
    },
    removePokemon: (state, action: { payload: number }) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer: pokemonsReducer } = pokemonsSlice;
export const {
  addPokemon,
  removePokemon,
  toggleFavouritePokemon,
  toggleRecentPokemon,
} = actions;
export default pokemonsReducer;
