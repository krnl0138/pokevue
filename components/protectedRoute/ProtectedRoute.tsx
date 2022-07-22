import { getAuth } from "firebase/auth";
import { useState } from "react";
import { app, dbGetUser } from "../../database";
import { URLS } from "../../utils/constants";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { CircularProgress } from "@mui/material";
import { getPokemon } from "../../lib/api/getPokemon";
import {
  addFavouritePokemon,
  addPokemon,
} from "../../lib/redux/slices/pokemonsSlice";

type TProtectedRoute = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: TProtectedRoute): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const pokemonsIds = useAppSelector((state) => state.pokemons.allIds);
  const [isFavsLoaded, setIsFavsLoaded] = useState(false);

  // Populate user in the global state if logged in or redirect to /login
  if (!user.username) {
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dbGetUser();
      } else {
        // router.push(URLS.login);
      }
    });
    // wait until onAuthStateChanged
    return <CircularProgress />;
  }

  // check for duplicates already in the store
  const favs = Object.values(user.favourites).filter(
    (id) => !pokemonsIds?.includes(id)
  );

  const populateFavourites = async () => {
    if (!favs) return;
    setIsFavsLoaded(true);
    const result = await Promise.all(
      favs.map(async (id) => await getPokemon(id))
    );

    result.forEach((pok) => {
      dispatch(addPokemon(pok));
      dispatch(addFavouritePokemon(pok.id));
    });
  };
  if (!isFavsLoaded) populateFavourites();

  return children;
};
