import { createSlice } from "@reduxjs/toolkit";
import { NUM_RECENT_POKEMON_CARDS } from "../../../utils/constants";
import { TPokemon } from "../../../utils/types";

type InitialState = {
  byId: { [id: number]: TPokemon };
  allIds: Array<number>;
  recentIds: Array<number>;
  randomIds: Array<number>;
  favouriteIds: Array<number>;
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: <InitialState>{
    byId: {},
    allIds: [],
    recentIds: [],
    randomIds: [],
    favouriteIds: [],
  },
  reducers: {
    addPokemon: (state, action: { payload: TPokemon }) => {
      const { payload } = action;
      const { id } = payload;
      if (state.allIds?.includes(id)) return;
      state.byId[id] = payload;
      state.allIds.push(id);
    },
    addFavouritePokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isFavourite = true;
      state.favouriteIds.push(id);
    },
    removeFavouritePokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isFavourite = false;
      state.favouriteIds = state.favouriteIds.filter((fav) => fav !== id);
    },
    addRandomPokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isRandom = true;
      state.randomIds.push(id);
    },
    removeRandomPokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isRandom = false;
      state.randomIds = state.randomIds.filter((fav) => fav !== id);
    },
    // TODO should be pure functions? is it pure?
    addRecentPokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      // if more than limit remove the oldest one
      if (state.recentIds.length === NUM_RECENT_POKEMON_CARDS) {
        const first = state.recentIds.shift();
        if (first) state.byId[first].isRecent = false;
      }

      state.byId[id].isRecent = true;
      state.recentIds.push(id);
    },
    removeRecentPokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.byId[id].isRecent = false;
      state.recentIds = state.recentIds.filter((i) => i !== id);
    },
    removePokemon: (state, action: { payload: number }) => {
      const id = action.payload;
      state.recentIds = state.recentIds.filter((i) => i !== id);
      state.randomIds = state.randomIds.filter((i) => i !== id);
      state.favouriteIds = state.favouriteIds.filter((i) => i !== id);
      state.allIds = state.allIds.filter((i) => i !== id);
      delete state.byId[id];
    },
  },
});

export const { actions, reducer: pokemonsReducer } = pokemonsSlice;
export const {
  addPokemon,
  removePokemon,
  addRecentPokemon,
  removeRecentPokemon,
  addFavouritePokemon,
  removeFavouritePokemon,
  addRandomPokemon,
  removeRandomPokemon,
} = actions;
