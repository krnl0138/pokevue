import { getAuth } from "firebase/auth";
import { useState } from "react";
import app from "../../firebase/index";
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
import { userSelect } from "../../lib/redux/slices/userSlice";
import { dbGetUser } from "../../firebase/dbUsers";
import { dbGetAverageRating } from "../../firebase/dbRatings";
import { TPokemon } from "../../utils/types";

type TProtectedRoute = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: TProtectedRoute): JSX.Element => {
  console.log("children are: ", children);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelect);
  const pokemonsIds = useAppSelector(selectAllIds);
  const [isFavsLoaded, setIsFavsLoaded] = useState(false);
  const [wasUserLoaded, setWasUserLoaded] = useState(false);
  console.log("wasUserLoaded from ProtectedRoute was: ", wasUserLoaded);

  // Populate user in the global state if logged in or redirect to /login
  if (!user?.username) {
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (user) => {
      if (!wasUserLoaded) {
        console.log("I was called on onAuthStateChanged in ProtectedRoute");
        setWasUserLoaded(true);
        await dbGetUser();
        return;
      } else {
        // NextJS's blocking this somehow
        // router.push(URLS.login);
        return <CircularProgress />;
      }
    });
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
      const pokemonId = pok.id;
      dbGetAverageRating({ pokemonId });
      dispatch(addPokemon(pok));
      dispatch(handleFavouritePokemon(pok.id));
    });
  };
  if (!isFavsLoaded) populateFavourites();

  if (!user?.username) {
    return <CircularProgress />;
  }

  return children;
};
