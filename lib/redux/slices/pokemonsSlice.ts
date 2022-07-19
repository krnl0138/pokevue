import { createSlice } from "@reduxjs/toolkit";
import { NUM_RECENT_POKEMONS_CADS } from "../../../utils/constants";
import { Pokemon } from "../../../utils/types";

type InitialState = {
  byId: { [id: number]: Pokemon };
  allIds: Array<number>;
  recentIds: Array<number>;
  randomIds: Array<number>;
  favouritesIds: Array<number>;
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: <InitialState>{
    byId: {},
    allIds: [],
    recentIds: [],
    randomIds: [],
    favouritesIds: [],
  },
  reducers: {
    addPokemon: (state, action: { payload: Pokemon }) => {
      const { payload } = action;
      const { id } = payload;
      if (state.allIds?.includes(id)) return;
      state.byId[id] = payload;
      state.allIds.push(id);
    },
    addFavouritePokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isFavourite = true;
      state.favouritesIds.push(id);
    },
    removeFavouritePokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isFavourite = false;
      state.favouritesIds.filter((fav) => fav !== id);
    },
    // TODO should be pure functions? is it pure?
    addRecentPokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      // if more than limit remove the oldest one
      if (state.recentIds.length === NUM_RECENT_POKEMONS_CADS) {
        const first = state.recentIds.shift();
        if (first) {
          state.byId[first].isRecent = false;
        }
      }

      state.byId[id].isRecent = true;
      state.recentIds.push(id);
    },
    removeRecentPokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isRecent = false;
      state.recentIds.filter((i) => i !== id);
    },
    removePokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      // Todo check if it works with immer
      state.allIds.filter((i) => i !== id);
      delete state.byId[id];
    },
  },
});

const { actions, reducer: pokemonsReducer } = pokemonsSlice;
export const {
  addPokemon,
  removePokemon,
  addRecentPokemon,
  removeRecentPokemon,
  addFavouritePokemon,
  removeFavouritePokemon,
} = actions;
export default pokemonsReducer;
