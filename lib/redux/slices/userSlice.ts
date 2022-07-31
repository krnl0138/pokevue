import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TLoginFormData } from "../../../components/forms/loginForm/loginFormReducer";
import { TProfileFormData } from "../../../components/forms/profileForm/profileFormReducer";
import { TRegisterFormData } from "../../../components/forms/registerForm/registerFormReducer";
import { authInterface } from "../../../firebase/authInterface";
import { AppThunk, TPokemon, TUser } from "../../../utils/types";
import { dbInterface } from "../../api/dbInterface";

const initialState: TUser = {
  uid: "",
  email: "",
  username: "",
  avatar: "",
  favourites: {},
  ratings: {},
  // stasus: ''
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      return { ...state, ...action.payload };
    },
    setUserRating: (
      state,
      action: PayloadAction<{ pokemonId: number; userRating: number }>
    ) => {
      const { pokemonId, userRating } = action.payload;
      state.ratings[pokemonId] = userRating;
    },
    resetUser: () => {
      return initialState;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(userGetAsyncThunk.fulfilled, (state, action) => {
  //     // state = action.payload;
  //     // state.status = 'logged'
  //   });
  // },
});

export const { actions, reducer: userReducer } = userSlice;
export const { setUser, resetUser, setUserRating } = actions;

// SELECTORS
export const selectUser = (state: RootState) => state.user;
export const selectUserUsername = (state: RootState) => state.user.username;
export const selectUserFavourites = (state: RootState) => state.user.favourites;
export const selectUserPokemonRating = (state: RootState, pokemonId: number) =>
  state.user.ratings[pokemonId];
export const selectCurrentUserUid = (state: RootState) => state.user.uid;
export const selectCurrentUserAvatar = (state: RootState) => state.user.avatar;

// THUNKS
export const userGet = (): AppThunk => async (dispatch, getState) => {
  const db = dbInterface();
  const uid = getState().user.uid;
  try {
    await db.getUser(uid);
  } catch {
    throw new Error("Something is wrong. No user was found for userGet call");
  }
};

// // TEST
// export const userGetAsyncThunk = createAsyncThunk("user/getUser", async () => {
//   const db = dbInterface();
//   try {
//     await db.getUser();
//     return;
//   } catch {
//     throw new Error("Something is wrong. An error occured in getUser call");
//   }
// });

export const userLogin =
  (data: TLoginFormData): AppThunk =>
  async (dispatch, getState) => {
    const { email, password } = data;
    if (!email || !password) return;
    const auth = authInterface();
    const db = dbInterface();
    const uid = getState().user.uid;
    try {
      await auth.login(email, password);
      await db.getUser(uid);
    } catch {
      throw new Error("Login has failed.");
    }
  };

export const userLoginGoogle = (): AppThunk => async (dispatch, getState) => {
  const auth = authInterface();
  const db = dbInterface();
  const uid = getState().user.uid;
  try {
    await auth.loginWithGoolge();
    await db.getUser(uid);
  } catch {
    throw new Error("Login with Google has failed.");
  }
};

export const userRegister =
  (data: TRegisterFormData): AppThunk =>
  async (dispatch, getState) => {
    if (!data) return;
    const auth = authInterface();
    const db = dbInterface();
    const uid = getState().user.uid;
    const { email, username, password } = data;
    if (!email || !password || !username) return;
    try {
      await Promise.all([
        auth.register(email, password),
        db.createUser(uid, { email, username }),
      ]);
    } catch {
      throw new Error("Register has failed.");
    }
  };

export const userUpdate =
  (data: TProfileFormData): AppThunk =>
  async (dispatch, getState) => {
    if (!data) return;
    const auth = authInterface();
    const db = dbInterface();
    const uid = getState().user.uid;
    const { email, password, avatar, username } = data;
    try {
      email && auth.updateEmail(email);
      password && auth.updatePassword(password);
      await db.updateUser(uid, { username, email, avatar });
    } catch {
      throw new Error("An error ocured on user information update.");
    }
  };

export const handleAddPokemonRating =
  (id: TPokemon["id"], rating: number): AppThunk =>
  async (dispatch, getState) => {
    const db = dbInterface();
    const uid = getState().user.uid;
    try {
      await db.createRating(uid, { id, rating });
    } catch {
      throw new Error("An error occurred while adding rating.");
    }
  };

// write a comment to the db and dispatch it to the store on /pokemons/byId/comments/[commentId]
export const writeComment =
  (pokemonId: TPokemon["id"], comment: string): AppThunk =>
  async (dispatch, getState) => {
    const db = dbInterface();
    const uid = getState().user.uid;
    try {
      await db.writeComment(uid, pokemonId, comment);
    } catch {
      throw new Error(
        "An error occurred while writing comment to the database."
      );
    }
  };
