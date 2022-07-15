import { createSlice } from "@reduxjs/toolkit";

type TInitialState = [
  {
    id: null;
    isFavourite: false;
    isRecent: false;
    pokemonData: { name: string; avatar: string; flavors: string };
  }
];

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: [],
  reducers: {
    addPokemon: (state, action) => {
      // doubling guard clause
      const double = state.some((item) => item.id === action.payload.id);
      if (double) return;

      const pokemon = {
        ...action.payload,
        isFavourite: false,
        isRecent: false,
      };

      state.push(pokemon);
    },
    toggleFavouritePokemon: (state, action) => {
      // action.payload = id: number
      const find = state.find((item) => item.id === action.payload);
      find.isFavourite = !find?.isFavourite;
    },
    toggleRecentPokemon: (state, action) => {
      // action.payload = id: number

      // add no more than the limit in recents
      const limit = 3;
      const allRecent = state.filter((item) => item.isRecent === true);
      if (allRecent.length === limit) {
        allRecent[0].isRecent = false;
      }

      const find = state.find((item) => item.id === action.payload);
      find.isRecent = !find.isRecent;
    },
    removePokemon: (state, action) => {
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
