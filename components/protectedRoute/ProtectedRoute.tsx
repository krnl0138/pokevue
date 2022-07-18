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
  const user = useAppSelector((state) => state.user);

  const pokemons = useAppSelector((state) => state.pokemons);

  // listen on auth events, redirect if not logged in
  useEffect(() => {
    if (user.username) return;
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dbGetUser();
      } else {
        router.push(urls.login);
      }
    });
    // TODO unsubscribe ?
  }, [user.username, router, dispatch, user.favourites, pokemons]);

  useEffect(() => {
    if (!user.favourites) return;
    const addFavouritesToStore = async () => {
      const fetchedFavourites = await Promise.all(
        Object.values(user.favourites)
          .filter((id) => {
            if (pokemons.some((pokemon) => pokemon.id === id)) return false;
            return true;
          })
          .map(async (id) => await getPokemon(id))
      );

      fetchedFavourites.forEach((pok) => {
        pok.isFavourite = true;
        dispatch(addPokemon(pok));
      });
    };
    addFavouritesToStore();
  }, [dispatch, pokemons, user.favourites]);

  if (!user.username) {
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
