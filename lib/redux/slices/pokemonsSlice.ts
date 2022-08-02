import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  NUM_COMMENTS_TO_SHOW,
  NUM_RECENT_POKEMON_CARDS,
} from "../../../utils/constants";
import { AppThunk, TComment, TPokemon } from "../../../utils/types";
import { dbInterface } from "../../api/dbInterface";
import { retrievePokemon } from "../../api/retrievePokemon";

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
    addPokemon: (state, action: PayloadAction<TPokemon>) => {
      const pokemon = action.payload;
      const id = pokemon.id;
      if (state.allIds.includes(id)) return;

      state.allIds.push(id);
      state.byId[id] = { ...state.byId[id], ...pokemon };
      if (state.favouriteIds.includes(id)) state.byId[id].isFavourite = true;
    },
    addPokemons: (state, action: PayloadAction<TPokemon[]>) => {
      const pokemons = action.payload;
      pokemons.forEach((p) => {
        const id = p.id;
        if (state.allIds.includes(id)) return;

        state.allIds.push(id);
        state.byId[id] = { ...state.byId[id], ...p };
        if (state.favouriteIds.includes(id)) state.byId[id].isFavourite = true;
      });
    },
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
    addFavouriteIds: (state, action: PayloadAction<number[]>) => {
      const favs = action.payload;
      state.favouriteIds = favs;
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
    addRecentPokemon: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      /* remove the oldest card if more than limit  */
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
      const { pokemonId, comments } = action.payload;
      if (comments.length === 0) state.byId[pokemonId].comments = [];
      state.byId[pokemonId].comments = comments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemon.pending, (state, action) => {
      // console.log(payload.action);
    }),
      builder.addCase(getPokemon.fulfilled, (state, action) => {
        const pokemon = action.payload;
        const id = pokemon.id;
        state.allIds.push(id);
        state.byId[id] = { ...state.byId[id], ...pokemon };
        if (state.favouriteIds.includes(id)) state.byId[id].isFavourite = true;
      });
  },
});

// DEFAULT EXPORTS
export const { actions, reducer: pokemonsReducer } = pokemonsSlice;
export const {
  addPokemon,
  addPokemons,
  removePokemon,
  addRecentPokemon,
  addFavouriteIds,
  removeRecentPokemon,
  addFavouritePokemon,
  removeFavouritePokemon,
  addRandomPokemon,
  removeRandomPokemon,
  addAverageRating,
  addPokemonNewComment,
  addPokemonComments,
} = actions;

// SELECTORS
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

// THUNKS
export const getPokemon = createAsyncThunk(
  "pokemons/addPokemon",
  async (id: string | number) => {
    const { getAverageRating } = dbInterface();
    try {
      const pokemon = await retrievePokemon(id);
      getAverageRating(pokemon.id);
      return pokemon;
    } catch (error) {
      throw new Error("Couldnt fetch your pokemon. Try again.");
    }
  }
);

export const handleFavouritePokemon =
  (id: TPokemon["id"], isFavourite?: TPokemon["isFavourite"]): AppThunk =>
  (dispatch, getState) => {
    const db = dbInterface();
    const uid = getState().user.uid;
    if (isFavourite) {
      db.removeFavourite(uid, id);
      dispatch(removeFavouritePokemon(id));
      return;
    }
    db.writeFavourite(uid, id);
    dispatch(addFavouritePokemon(id));
  };

export const handleRecentPokemon =
  (id: TPokemon["id"], isRecent?: TPokemon["isRecent"]): AppThunk =>
  (dispatch) => {
    if (isRecent) {
      dispatch(removeRecentPokemon(id));
      return;
    }
    dispatch(addRecentPokemon(id));
  };
