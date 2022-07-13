import { createSlice } from "@reduxjs/toolkit";

export const favouritePokemonSlice = createSlice({
  name: "favouritePokemon",
  initialState: [],
  reducers: {
    addFavouritePokemon: (state, action) => {
      state.push(action.payload);
    },
    removeFavouritePokemon: (state, action) => {
      state.filter((pokemon, i) => i !== action.payload.index);
    },
  },
});
