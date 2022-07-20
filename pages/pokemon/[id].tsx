import { useRouter } from "next/router";
import { Layout } from "../../components/utils/layout/Layout";
import { PokemonDetailed } from "../../components/pokemonDetailed/PokemonDetailed";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { ProtectedRoute } from "../../components/protectedRoute/ProtectedRoute";
import { getPokemon } from "../../lib/api/getPokemon";
import { useEffect, useState } from "react";
import { addPokemon } from "../../lib/redux/slices/pokemonsSlice";

// Should fetch more pokemon data potentially to provide more info.
const Pokemon = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathId = Number(router.asPath.split("/")[2]);
  const pokemonIds = useAppSelector((state) => state.pokemons.allIds);
  const [hasPokemon, setHasPokemon] = useState(false);

  useEffect(() => {
    // TODO hotfix, sometimes router returns '[id]' string
    // if (pathId === "[id]") return;
    if (!pathId) return;
    if (pokemonIds.includes(pathId)) setHasPokemon(true);

    const loadPokemon = async (id: number) => {
      const pokemon = await getPokemon(id);
      dispatch(addPokemon(pokemon));
      setHasPokemon(true);
    };

    loadPokemon(pathId);
  }, [pathId]);

  return (
    <ProtectedRoute>
      <Layout>{hasPokemon && <PokemonDetailed id={pathId} />}</Layout>
    </ProtectedRoute>
  );
};

export default Pokemon;
