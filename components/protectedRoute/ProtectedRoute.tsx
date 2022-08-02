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
  const allIds = useAppSelector(selectAllIds);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Listen auth and populate user to the store or redirect to login */
  useEffect(() => {
    const redirect = () => router.push(URLS.login);
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await db.getUser(user.uid);
        setIsLoggedIn(true);
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
    const favIdsToFetch = removeDuplicates(userFavourites, allIds);
    if (favIdsToFetch.length === 0) return;

    const populateFavourites = async () => {
      setIsFavsPopulated(true);
      // TODO should be Promise.allSettled and retry request for errors if any
      await Promise.all(favIdsToFetch.map((id) => dispatch(getPokemon(id))));
      favIdsToFetch.forEach((id) => dispatch(addFavouritePokemon(id)));
    };

    populateFavourites();
  }, [username]);

  return isLoggedIn ? children : null;
};
