import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { dbRemoveFavourite, dbWriteFavourite } from "../../../database";
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

export const selectAllIds = (state: RootState) => state.pokemons.allIds;
export const selectFavouriteIds = (state: RootState) =>
  state.pokemons.favouriteIds;
export const selectRecentIds = (state: RootState) => state.pokemons.recentIds;
export const selectRandomIds = (state: RootState) => state.pokemons.randomIds;
export const selectAllPokemons = (state: RootState) => state.pokemons.byId;
export const selectPokemonById = (state: RootState, id: number) =>
  state.pokemons.byId[id];

export const handleFavouritePokemon =
  (id: TPokemon["id"], isFavourite?: TPokemon["isFavourite"]) =>
  (dispatch: AppDispatch) => {
    // TODO db should be in try..catch block ?
    if (isFavourite) {
      // dbRemoveFavourite(id);
      dispatch(removeFavouritePokemon(id));
      return;
    }
    // dbWriteFavourite(id);
    dispatch(addFavouritePokemon(id));
  };

export const handleRecentPokemon =
  (id: TPokemon["id"], isRecent?: TPokemon["isRecent"]) =>
  (dispatch: AppDispatch) => {
    if (isRecent) {
      dispatch(removeRecentPokemon(id));
      return;
    }
    dispatch(addRecentPokemon(id));
  };
