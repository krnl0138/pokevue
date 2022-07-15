import { createSlice } from "@reduxjs/toolkit";

export const favouritePokemonSlice = createSlice({
  name: "favouritePokemon",
  initialState: [],
  reducers: {
    addFavouritePokemon: (state, action) => {
      state.push(action.payload);
    },
    removeFavouritePokemon: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer: favouritePokemonReducer } = favouritePokemonSlice;
export const { addFavouritePokemon, removeFavouritePokemon } = actions;
export default favouritePokemonReducer;
