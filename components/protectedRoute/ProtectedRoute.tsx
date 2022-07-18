import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { app, dbGetUser } from "../../database";
import { PROJECT_URLS as urls } from "../../utils/constants";
import { useRouter } from "next/router";
import { setUser } from "../../lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { getPokemon } from "../../lib/api/getPokemon";
import { addPokemon } from "../../lib/redux/slices/pokemonsSlice";

type TProtectedRoute = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: TProtectedRoute): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const favouritePokemons = useAppSelector((state) => state.pokemons).filter(
    (pokemon) => pokemon.isFavourite === true
  );

  // listen on auth events, redirect if not logged in
  useEffect(() => {
    if (user.username) return;
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      if (user) {
        // ...
      } else {
        router.push(urls.login);
      }
    });
    // TODO unsubscribe ?
  }, [user.username, router]);

  // populate user in redux store
  useEffect(() => {
    if (user.username) return;

    const populateUser = async () => {
      const data = await dbGetUser();
      dispatch(setUser(data));
    };

    if (!user.username) populateUser();
  }, [dispatch, user.username]);

  // populate favourites
  useEffect(() => {
    if (!user.favourites) return;
    // TODO should be memoized?
    const populateFavourites = async () => {
      for (const val of Object.values(user.favourites)) {
        if (favouritePokemons.some((fav) => fav.id === val)) return;

        const pokemon = await getPokemon(val);
        pokemon.isFavourite = true;
        dispatch(addPokemon(pokemon));
      }
    };
    populateFavourites();
  }, [dispatch, user.favourites, favouritePokemons]);

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
