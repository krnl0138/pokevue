import { useRouter } from "next/router";
import { Layout } from "../../components/utils/layout/Layout";
import { PokemonDetailed } from "../../components/pokemonDetailed/PokemonDetailed";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { ProtectedRoute } from "../../components/protectedRoute/ProtectedRoute";
import { getPokemon } from "../../lib/api/getPokemon";
import { useEffect } from "react";
import { addPokemon } from "../../lib/redux/slices/pokemonsSlice";
import { CircularProgress } from "@mui/material";

// TODO should do SSR with its own richer parse function or render from cient store?
// Should fetch more pokemon data potentially to provide more info.
const Pokemon = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathId = Number(router.asPath.split("/")[2]);
  const pokemon = useAppSelector((state) => state.pokemons.byId[pathId]);
  console.log("pokemon is:", pokemon);

  useEffect(() => {
    // TODO hotfix, sometimes router returns '[id]' string
    // if (pathId === "[id]") return;
    if (pokemon) return;

    const loadPokemon = async (id: number) => {
      const pokemon = await getPokemon(id);
      dispatch(addPokemon(pokemon));
    };

    loadPokemon(pathId);
  }, [dispatch, pathId, pokemon]);

  return (
    <ProtectedRoute>
      <Layout>
        {pokemon ? <PokemonDetailed pokemon={pokemon} /> : <CircularProgress />}
      </Layout>
    </ProtectedRoute>
  );
};

export default Pokemon;
