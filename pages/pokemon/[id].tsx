import { useRouter } from "next/router";
import { Layout } from "../../components/utils/layout/Layout";
import { PokemonScreen } from "../../components/pokemonScreen/PokemonScreen";
import { useAppSelector } from "../../utils/hooks";
import { ProtectedRoute } from "../../components/protectedRoute/ProtectedRoute";
import { getPokemon } from "../../lib/api/getPokemon";
import { Pokemon } from "../../utils/types";
import { useEffect, useState } from "react";

const NoPokemonScreen = () => {
  return <p>Something is wrong. No pokemon was found.</p>;
};

// Should fetch more pokemon data potentially to provide more info.
const PokemonById = () => {
  const router = useRouter();
  const id = router.asPath.split("/")[2];
  const [pokemon, setPokemon] = useState<null | Pokemon>();
  const pokemonRedux = useAppSelector((state) => state.pokemons).find(
    (pokemon) => pokemon.id === Number(id)
  );

  useEffect(() => {
    // TODO hotfix, sometimes router returns '[id]' string
    if (id === "[id]") return;
    if (pokemonRedux) return setPokemon(pokemonRedux);
    const getAsync = async (id: string) => {
      const pokemon = await getPokemon(id);
      setPokemon(pokemon);
    };

    getAsync(id);
  }, [pokemonRedux, id]);

  return (
    <ProtectedRoute>
      <Layout>
        {pokemon ? <PokemonScreen data={pokemon} /> : <NoPokemonScreen />}
      </Layout>
    </ProtectedRoute>
  );
};

export default PokemonById;
