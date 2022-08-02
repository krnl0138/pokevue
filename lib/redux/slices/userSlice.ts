import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TLoginFormData } from "../../../components/forms/loginForm/loginFormReducer";
import { TProfileFormData } from "../../../components/forms/profileForm/profileFormReducer";
import { TRegisterFormData } from "../../../components/forms/registerForm/registerFormReducer";
import { AppThunk, TPokemon, TUser } from "../../../utils/types";
import { authInterface } from "../../api/authInterface";
import { dbInterface } from "../../api/dbInterface";

const initialState: TUser = {
  uid: "",
  email: "",
  username: "",
  avatar: "",
  favourites: {},
  ratings: {},
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
    setUserAvatar: (
      state,
      action: PayloadAction<{ uid: string; avatar: string }>
    ) => {
      const { avatar } = action.payload;
      state.avatar = avatar;
    },
    resetUser: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: userReducer } = userSlice;
export const { setUser, resetUser, setUserRating, setUserAvatar } = actions;

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
    // await db.getUserAvatar(uid);
  } catch {
    throw new Error("Something is wrong. No user was found for userGet call");
  }
};

export const userLogin =
  (data: TLoginFormData): AppThunk =>
  async () => {
    const { email, password } = data;
    if (!email || !password) return;
    const auth = authInterface();
    const db = dbInterface();
    try {
      const user = await auth.login(email, password);
      await db.getUser(user.uid);
    } catch {
      throw new Error("Login has failed.");
    }
  };

export const userLoginGoogle = (): AppThunk => async (dispatch) => {
  const auth = authInterface();
  const db = dbInterface();
  try {
    const user = await auth.loginWithGoolge();
    const { uid, displayName: username, email, photoURL } = user;
    if (!username || !email)
      throw new Error(
        "No username or email were provided by Google authentication"
      );
    try {
      await db.createUser(uid, { email, username });
    } catch {
      throw new Error("An error occured while creating user");
    }
    try {
      if (!photoURL) return;
      const image = await fetch(photoURL);
      const blob = await image.blob();
      await db.uploadUserAvatar(uid, blob as File);
    } catch {
      throw new Error("An error occured while uploading an image");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Login with Google has failed.");
  }
};

export const userRegister =
  (data: TRegisterFormData): AppThunk =>
  async () => {
    if (!data) return;
    const { email, username, password } = data;
    if (!email || !password || !username) return;
    const auth = authInterface();
    const db = dbInterface();
    try {
      const user = await auth.register(email, password);
      await db.createUser(user.uid, { email, username });
    } catch (error) {
      throw new Error("An error occured during registration.");
    }
  };

export const userUpdate =
  (data: TProfileFormData): AppThunk =>
  async (dispatch, getState) => {
    if (!data) return;
    const auth = authInterface();
    const db = dbInterface();
    const user = getState().user;
    const { uid } = user;
    // TODO should be checked if data not equal current
    const { email, password, avatar, username } = data;
    try {
      email && auth.updateEmail(email);
      password && auth.updatePassword(password);
      await db.updateUser(uid, { username, email });
      avatar && db.uploadUserAvatar(uid, avatar);
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
