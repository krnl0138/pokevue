import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "..";
import { TLoginFormData } from "../../../components/forms/loginForm/loginFormReducer";
import { TProfileFormData } from "../../../components/forms/profileForm/profileFormReducer";
import { TRegisterFormData } from "../../../components/forms/registerForm/registerFormReducer";
import {
  handleUpdateEmail,
  handleUpdatePassword,
  handleCreateUser,
  hanldeSignInWithEmailPassword,
  handleGoogleAuth,
} from "../../../firebase/auth";
import {
  dbUpdateUserData,
  dbGetUser,
  dbWriteUserData,
} from "../../../firebase/dbUsers";
import {
  dbCreateRating,
  dbGetAverageRating,
} from "../../../firebase/dbRatings";
import { TPokemon, TUser } from "../../../utils/types";

const initialState: TUser = {
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
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUserRating: (state, action) => {
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

export const userSelect = (state: RootState) => state.user;

// export const userGet = () => async (dispatch: AppDispatch) => {
//   try {
//     const user = await dbGetUser();
//     dispatch(setUser(user));
//   } catch {
//     throw new Error("No user was found");
//   }
// };

export const userLogin =
  (data: TLoginFormData) => async (dispatch: AppDispatch) => {
    const { email, password } = data;
    if (!email || !password) return;
    console.log("email and password from userLogin are: ", email, password);
    try {
      console.log("executing hanldeSignInWithEmailPassword");
      await hanldeSignInWithEmailPassword(email, password);
      console.log("executing dbGetUser");
      await dbGetUser();
      // const user = await dbGetUser();
      // dispatch(setUser(user));
    } catch {
      throw new Error("Register failed.");
    }
  };

export const userLoginGoogle = () => async (dispatch: AppDispatch) => {
  try {
    await handleGoogleAuth();
    const user = await dbGetUser();
    dispatch(setUser(user));
  } catch {
    throw new Error("Register failed.");
  }
};

export const userRegister =
  (data: TRegisterFormData) => async (dispatch: AppDispatch) => {
    if (!data) return;
    const { email, username, password } = data;
    if (!email || !password || !username) return;
    try {
      await handleCreateUser(email, password);
      const newUser = { username, email };
      await dbWriteUserData(newUser);
      const user = await dbGetUser();
      dispatch(setUser(user));
    } catch {
      throw new Error("Register failed.");
    }
  };

export const userUpdate =
  (data: TProfileFormData) => async (dispatch: AppDispatch) => {
    if (!data) return;
    const { email, password, avatar, username } = data;
    try {
      email && handleUpdateEmail(email);
      password && handleUpdatePassword(password);
      await dbUpdateUserData({
        username,
        email,
        avatar,
      });
      const user = await dbGetUser();
      dispatch(setUser(user));
    } catch {
      throw new Error("Register failed.");
    }
  };

export const selectUserPokemonRating = (state: RootState, pokemonId: number) =>
  state.user.ratings[pokemonId];

export const handleAddPokemonRating =
  (pokemonId: TPokemon["id"], rating: number) =>
  async (dispatch: AppDispatch, getState: RootState) => {
    try {
      await dbCreateRating({ pokemonId, rating });
      await dbGetUser();
      // dispatch(addRating({ pokemonId, rating }));
      await dbGetAverageRating({ pokemonId });
    } catch {
      throw new Error("An error occurred while adding rating.");
    }
  };
