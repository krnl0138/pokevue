import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { TLoginFormData } from "../../../components/forms/loginForm/loginFormReducer";
import { TProfileFormData } from "../../../components/forms/profileForm/profileFormReducer";
import { TRegisterFormData } from "../../../components/forms/registerForm/registerFormReducer";
import { TPokemon, TUser } from "../../../utils/types";
import { authInterface } from "../../../firebase/authInterface";
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
    resetUser: () => {
      return initialState;
    },
  },
});

export const { actions, reducer: userReducer } = userSlice;
export const { setUser, resetUser, setUserRating } = actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserPokemonRating = (state: RootState, pokemonId: number) =>
  state.user.ratings[pokemonId];
export const selectCurrentUserUid = (state: RootState) => state.user.uid;

// TODO should be async thunk
export const userGet = () => async (dispatch: AppDispatch) => {
  const db = dbInterface();
  try {
    await db.getUser();
  } catch {
    throw new Error("Something is wrong. No user was found for userGet call");
  }
};

// TODO should be async thunk
export const userLogin =
  (data: TLoginFormData) => async (dispatch: AppDispatch) => {
    const { email, password } = data;
    if (!email || !password) return;
    const auth = authInterface();
    const db = dbInterface();
    try {
      await auth.login(email, password);
      await db.getUser();
    } catch {
      throw new Error("Login has failed.");
    }
  };

// TODO should be async thunk
export const userLoginGoogle = () => async (dispatch: AppDispatch) => {
  const auth = authInterface();
  const db = dbInterface();
  try {
    await auth.loginWithGoolge();
    await db.getUser();
  } catch {
    throw new Error("Login with Google has failed.");
  }
};

// TODO should be async thunk
export const userRegister =
  (data: TRegisterFormData) => async (dispatch: AppDispatch) => {
    if (!data) return;
    const auth = authInterface();
    const db = dbInterface();
    const { email, username, password } = data;
    if (!email || !password || !username) return;
    try {
      await Promise.all([
        auth.register(email, password),
        db.createUser({ email, username }),
      ]);
    } catch {
      throw new Error("Register has failed.");
    }
  };

// TODO should be async thunk
export const userUpdate = (data: TProfileFormData) => async () => {
  if (!data) return;
  const auth = authInterface();
  const db = dbInterface();
  const { email, password, avatar, username } = data;
  try {
    email && auth.updateEmail(email);
    password && auth.updatePassword(password);
    await db.updateUser({ username, email, avatar });
  } catch {
    throw new Error("An error ocured on user information update.");
  }
};

// TODO should be async thunk
export const handleAddPokemonRating = (id: TPokemon["id"], rating: number) => {
  const db = dbInterface();
  async () => {
    try {
      await db.createRating({ id, rating });
    } catch {
      throw new Error("An error occurred while adding rating.");
    }
  };
};

// write a comment to the db and dispatch it to the store on /pokemons/byId/comments/[commentId]
export const writeComment = async (
  pokemonId: TPokemon["id"],
  comment: string
) => {
  const db = dbInterface();
  try {
    await db.writeComment(pokemonId, comment);
  } catch {
    throw new Error("An error occurred while writing comment to the database.");
  }
};
