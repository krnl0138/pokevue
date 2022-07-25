import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue,
} from "firebase/database";
import app from "./index";
import store from "../lib/redux";
import { addAverageRating } from "../lib/redux/slices/pokemonsSlice";
import { calculateAverageRating } from "../utils/functions";
import { setUserRating } from "../lib/redux/slices/userSlice";

const db = getDatabase(app);
const auth = getAuth(app);

// db/pokemons/[pokemonId]/ratings :
//          {uuid1:1,
//           uuid2:5,
//           uuid3:2,
//           uuid4:2,
//           uuid5:1}
// db/users/[uuid1]/ratings :
//          {pokemonId1:1,
//           pokemonId2:5,
//           pokemonId3:2}
const pokemonRatingRef = (pokemonId: number) =>
  ref(db, `pokemons/${pokemonId}/ratings/`);
const pokemonRatingByUserRef = (userId: string, pokemonId: number) =>
  ref(db, `pokemons/${pokemonId}/ratings/${userId}`);
const userRatingRef = (userId: string) => ref(db, `users/${userId}/ratings`);
const userRatingByPokemonRef = (userId: string, pokemonId: number) =>
  ref(db, `users/${userId}/ratings/${pokemonId}`);

export const dbCreateRating = async (data: {
  pokemonId: number;
  rating: number;
}) => {
  const { pokemonId, rating } = data;

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await Promise.all([
        set(pokemonRatingByUserRef(user.uid, pokemonId), rating),
        set(userRatingByPokemonRef(user.uid, pokemonId), rating),
      ]);
      onValue(userRatingByPokemonRef(user.uid, pokemonId), (snapshot) => {
        const userRating = snapshot.val();
        store.dispatch(setUserRating({ pokemonId, userRating }));
      });
      onValue(pokemonRatingRef(pokemonId), (snapshot) => {
        const ratings = snapshot.val();
        const ratingAverage = calculateAverageRating(ratings);
        if (ratingAverage) {
          store.dispatch(addAverageRating({ pokemonId, ratingAverage }));
        }
      });
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbUpdateRating = async (data: {
  pokemonId: number;
  rating: number;
}) => {
  const { pokemonId, rating } = data;
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await Promise.all([
        update(pokemonRatingRef(pokemonId), { [user.uid]: rating }),
        update(userRatingRef(user.uid), { [pokemonId]: rating }),
      ]);
      onValue(userRatingByPokemonRef(user.uid, pokemonId), (snapshot) => {
        const userRating = snapshot.val();
        store.dispatch(setUserRating({ pokemonId, userRating }));
      });
      onValue(pokemonRatingRef(pokemonId), (snapshot) => {
        const ratings = snapshot.val();
        const ratingAverage = calculateAverageRating(ratings);
        if (ratingAverage) {
          store.dispatch(addAverageRating({ pokemonId, ratingAverage }));
        }
      });
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbRemoveRating = (data: { pokemonId: number }) => {
  const { pokemonId } = data;
  auth.onAuthStateChanged((user) => {
    if (user) {
      remove(pokemonRatingByUserRef(user.uid, pokemonId));
      remove(userRatingByPokemonRef(user.uid, pokemonId));
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};

export const dbGetAverageRating = async (data: { pokemonId: number }) => {
  const { pokemonId } = data;
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      onValue(pokemonRatingRef(pokemonId), (snapshot) => {
        const ratings = snapshot.val();
        const ratingAverage = calculateAverageRating(ratings);
        store.dispatch(addAverageRating({ pokemonId, ratingAverage }));
      });
    } else {
      throw new Error(`No user is logged in. Function call cannot be made.`);
    }
  });
};
