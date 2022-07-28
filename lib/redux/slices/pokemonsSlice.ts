import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import {
  NUM_COMMENTS_TO_SHOW,
  NUM_RECENT_POKEMON_CARDS,
} from "../../../utils/constants";
import { TComment, TPokemon, TUser } from "../../../utils/types";
import { dbInterface } from "../../api/dbInterface";
import { getPokemon } from "../../api/getPokemon";

type SliceState = {
  byId: { [id: number]: TPokemon };
  allIds: Array<number>;
  recentIds: Array<number>;
  randomIds: Array<number>;
  favouriteIds: Array<number>;
};

const initialState: SliceState = {
  byId: {},
  allIds: [],
  recentIds: [],
  randomIds: [],
  favouriteIds: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    addFavouritePokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.byId[id].isFavourite = true;
      state.favouriteIds.push(id);
    },
    removeFavouritePokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.byId[id].isFavourite = false;
      state.favouriteIds = state.favouriteIds.filter((fav) => fav !== id);
    },
    addRandomPokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.byId[id].isRandom = true;
      state.randomIds.push(id);
    },
    removeRandomPokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.byId[id].isRandom = false;
      state.randomIds = state.randomIds.filter((fav) => fav !== id);
    },
    // TODO should be pure functions? is it pure?
    addRecentPokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // if more than limit remove the oldest one
      if (state.recentIds.length === NUM_RECENT_POKEMON_CARDS) {
        const first = state.recentIds.shift();
        if (first) state.byId[first].isRecent = false;
      }
      state.byId[id].isRecent = true;
      state.recentIds.push(id);
    },
    removeRecentPokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.byId[id].isRecent = false;
      state.recentIds = state.recentIds.filter((i) => i !== id);
    },
    removePokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.recentIds = state.recentIds.filter((i) => i !== id);
      state.randomIds = state.randomIds.filter((i) => i !== id);
      state.favouriteIds = state.favouriteIds.filter((i) => i !== id);
      state.allIds = state.allIds.filter((i) => i !== id);
      delete state.byId[id];
    },
    addAverageRating: (
      state,
      action: PayloadAction<{ pokemonId: number; ratingAverage: number }>
    ) => {
      const { pokemonId, ratingAverage } = action.payload;
      state.byId[pokemonId].ratingAverage = ratingAverage;
    },
    addPokemonNewComment: (
      state,
      action: PayloadAction<{
        pokemonId: number;
        newComment: TComment;
      }>
    ) => {
      console.log("addPokemonNewComment was called");
      const { pokemonId, newComment } = action.payload;
      const comments = state.byId[pokemonId].comments;
      // const commentsIds = state.byId[pokemonId].commentsIds;
      if (comments.length === NUM_COMMENTS_TO_SHOW) comments.shift();
      comments.push(newComment);
      // commentsIds.push(newComment.commentId);
    },
    addPokemonComments: (
      state,
      action: PayloadAction<{
        pokemonId: number;
        comments: TComment[];
      }>
    ) => {
      console.log("addPokemonComments was called");
      const { pokemonId, comments } = action.payload;
      state.byId[pokemonId].comments = comments;
    },
    addPokemonCommentsIds: (
      state,
      action: PayloadAction<{
        pokemonId: number;
        commentsIds: string[];
      }>
    ) => {
      const { pokemonId, commentsIds } = action.payload;
      // state.byId[pokemonId].commentsIds = commentsIds;
    },
    // removeComment: (
    //   state,
    //   action: PayloadAction<{ pokemonId: number; commentId: string }>
    // ) => {
    //   const { pokemonId, commentId } = action.payload;
    //   state.byId[pokemonId].comments;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPokemon.pending, (state, action) => {})
      .addCase(addPokemon.rejected, (state, action) => {})
      .addCase(addPokemon.fulfilled, (state, action) => {
        const db = dbInterface();
        const pokemon = action.payload;
        const id = pokemon.id;
        state.byId[id] = pokemon;
        state.allIds.push(id);
        db.getAverageRating({ id });
        // TODO should be on different async call for Detailed view only to decrease db calls
        console.log("Pokemon was added and getComments were called!");
        db.getComments(id);
      });
  },
});

// Default Exports
export const { actions, reducer: pokemonsReducer } = pokemonsSlice;
export const {
  removePokemon,
  addRecentPokemon,
  removeRecentPokemon,
  addFavouritePokemon,
  removeFavouritePokemon,
  addRandomPokemon,
  removeRandomPokemon,
  addAverageRating,
  addPokemonNewComment,
  addPokemonComments,
  addPokemonCommentsIds,
} = actions;

// Selectors
export const selectAllIds = (state: RootState) => state.pokemons.allIds;
export const selectFavouriteIds = (state: RootState) =>
  state.pokemons.favouriteIds;
export const selectRecentIds = (state: RootState) => state.pokemons.recentIds;
export const selectRandomIds = (state: RootState) => state.pokemons.randomIds;
export const selectAllPokemons = (state: RootState) => state.pokemons.byId;
export const selectPokemonById = (state: RootState, id: number) =>
  state.pokemons.byId[id];
export const selectAverageRating = (state: RootState, id: number) =>
  state.pokemons.byId[id].ratingAverage;

export const selectPokemonComments = (state: RootState, pokemonId: number) =>
  state.pokemons.byId[pokemonId].comments;

// Thunks
// TODO should be async thunk
export const handleFavouritePokemon =
  (id: TPokemon["id"], isFavourite?: TPokemon["isFavourite"]) =>
  (dispatch: AppDispatch) => {
    const db = dbInterface();
    // TODO db should be in try..catch block ?
    if (isFavourite) {
      // db.removeFavourite(id);
      dispatch(removeFavouritePokemon(id));
      return;
    }
    // db.writeFavourite(id);
    dispatch(addFavouritePokemon(id));
  };

// TODO should be async thunk
export const handleRecentPokemon =
  (id: TPokemon["id"], isRecent?: TPokemon["isRecent"]) =>
  (dispatch: AppDispatch) => {
    if (isRecent) {
      dispatch(removeRecentPokemon(id));
      return;
    }
    dispatch(addRecentPokemon(id));
  };

export const addPokemon = createAsyncThunk(
  "pokemons/addPokemon",
  async (id: string | number) => {
    // ask to fetch the pokemon.
    // on fulfilled IF fetched: add to the store.
    const pokemon = await getPokemon(id);
    // return afterwards to access for later actions, like set favourite/recent statuses.
    return pokemon;
  }
);
