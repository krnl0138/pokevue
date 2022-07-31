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
import { TUser } from "../utils/types";

const db = getDatabase(app);

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

export const dbCreateRating = async (
  uid: TUser["uid"],
  data: {
    pokemonId: number;
    rating: number;
  }
) => {
  const { pokemonId, rating } = data;

  await Promise.all([
    set(pokemonRatingByUserRef(uid, pokemonId), rating),
    set(userRatingByPokemonRef(uid, pokemonId), rating),
  ]);
  onValue(userRatingByPokemonRef(uid, pokemonId), (snapshot) => {
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
};

export const dbUpdateRating = async (
  uid: TUser["uid"],
  data: {
    pokemonId: number;
    rating: number;
  }
) => {
  const { pokemonId, rating } = data;
  await Promise.all([
    update(pokemonRatingRef(pokemonId), { [uid]: rating }),
    update(userRatingRef(uid), { [pokemonId]: rating }),
  ]);
  onValue(userRatingByPokemonRef(uid, pokemonId), (snapshot) => {
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
};

export const dbRemoveRating = (
  uid: TUser["uid"],
  data: { pokemonId: number }
) => {
  const { pokemonId } = data;
  remove(pokemonRatingByUserRef(uid, pokemonId));
  remove(userRatingByPokemonRef(uid, pokemonId));
};

export const dbGetAverageRating = (pokemonId: number) => {
  onValue(pokemonRatingRef(pokemonId), (snapshot) => {
    const ratings = snapshot.val();
    const ratingAverage = calculateAverageRating(ratings);
    store.dispatch(addAverageRating({ pokemonId, ratingAverage }));
  });
};
