import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { app, dbGetUser } from "../../database";
import { PROJECT_URLS as urls } from "../../utils/constants";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { getPokemon } from "../../lib/api/getPokemon";
import { addPokemon } from "../../lib/redux/slices/pokemonsSlice";
import { Pokemon } from "../../utils/types";

type TProtectedRoute = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: TProtectedRoute): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userStore = useAppSelector((state) => state.user);

  const pokemons = useAppSelector((state) => state.pokemons);

  // listen on auth events, redirect if not logged in
  useEffect(() => {
    if (userStore.username) return;
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dbGetUser();
      } else {
        router.push(urls.login);
      }
    });
    // TODO unsubscribe ?
  }, [userStore.username, router, dispatch, userStore.favourites, pokemons]);

  useEffect(() => {
    if (!userStore.favourites) return;
    const populateFavourites = async () => {
      const result: Promise<Pokemon>[] = [];
      for (const val of Object.values(userStore.favourites)) {
        if (pokemons.some((pokemon) => pokemon.id === val)) continue;
        result.push(new Promise((resolve) => resolve(getPokemon(val))));
      }
      const res = await Promise.all(result);
      res.forEach((pok) => {
        pok.isFavourite = true;
        dispatch(addPokemon(pok));
      });
    };
    populateFavourites();
  }, [dispatch, pokemons, userStore.favourites]);

  if (!userStore.username) {
    return (
      <Box maxWidth={"xl"} sx={{ backgroundColor: "primary.dark" }}>
        <Container>
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return children;
};
