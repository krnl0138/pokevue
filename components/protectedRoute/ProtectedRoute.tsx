import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import app from "../../firebase/index";
import { dbInterface } from "../../lib/api/dbInterface";
import {
  addFavouritePokemon,
  getPokemon,
  selectAllIds,
} from "../../lib/redux/slices/pokemonsSlice";
import {
  selectUserFavourites,
  selectUserUsername,
} from "../../lib/redux/slices/userSlice";
import { URLS } from "../../utils/constants";
import { removeDuplicates } from "../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

type TProtectedRoute = {
  children: JSX.Element;
};

// A single source of truth for authentication.
// It asks db for the user data and dispatches it
export const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = getAuth(app);
  const db = dbInterface();
  const username = useAppSelector(selectUserUsername);
  const userFavourites = useAppSelector(selectUserFavourites);
  const pokemonsIds = useAppSelector(selectAllIds);

  const redirect = () => router.push(URLS.login);

  /* Listen auth and populate user to the store or redirect to login */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await db.getUser(user.uid);
        return;
      } else {
        return redirect();
      }
    });
    return () => unsubscribe();
  }, []);

  /* If logged in fetch and populate favourites to the store. */
  const [isFavsPopulated, setIsFavsPopulated] = useState(false);
  useEffect(() => {
    if (isFavsPopulated || Object.keys(userFavourites).length === 0) return;
    const favIdsToFetch = removeDuplicates(userFavourites, pokemonsIds);
    if (favIdsToFetch.length === 0) return;

    const populateFavourites = async () => {
      setIsFavsPopulated(true);
      const favPokemons = await Promise.all(
        favIdsToFetch.map((id) => dispatch(getPokemon(id)).unwrap())
      );
      favPokemons.forEach((p) => dispatch(addFavouritePokemon(p.id)));
    };

    populateFavourites();
  }, [username]);

  return username ? children : null;
};
