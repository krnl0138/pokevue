import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { app, dbGetUser } from "../../database";
import { PROJECT_URLS as urls } from "../../utils/constants";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
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
  const pokemons = useAppSelector((state) => state.pokemons.byId);
  const pokemonsIds = useAppSelector((state) => state.pokemons.allIds);

  // Populate user in the global state if logged in or redirect to /login
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

  // Populate user's favourites in the global state
  useEffect(() => {
    if (!user.favourites) return;
    const populateFavourites = async () => {
      let result;
      const favs = Object.values(user.favourites);
      const duplicate = (id: number) => !pokemonsIds.includes(id);

      if (!pokemonsIds) {
        result = await Promise.all(
          favs.map(async (id) => await getPokemon(id))
        );
      } else {
        result = await Promise.all(
          favs.filter(duplicate).map(async (id) => await getPokemon(id))
        );
      }

      result.forEach((pok) => {
        dispatch(addPokemon(pok));
        dispatch(addFavouritePokemon(pok.id));
      });
    };
    populateFavourites();
  }, [dispatch, pokemonsIds, user.favourites]);

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
