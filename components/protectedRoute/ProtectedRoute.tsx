import { getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../../database";
import { URLS } from "../../utils/constants";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { CircularProgress } from "@mui/material";
import { getPokemon } from "../../lib/api/getPokemon";
import {
  addPokemon,
  handleFavouritePokemon,
  selectAllIds,
} from "../../lib/redux/slices/pokemonsSlice";
import { userGet, userSelect } from "../../lib/redux/slices/userSlice";

type TProtectedRoute = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: TProtectedRoute): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelect);
  const pokemonsIds = useAppSelector(selectAllIds);
  const [isFavsLoaded, setIsFavsLoaded] = useState(false);

  // Populate user in the global state if logged in or redirect to /login
  if (!user.username) {
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dispatch(userGet());
      } else {
        router.push(URLS.login);
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
      dispatch(handleFavouritePokemon(pok.id));
    });
  };
  if (!isFavsLoaded) populateFavourites();

  return children;
};
