import { useRouter } from "next/router";
import { Layout } from "../../components/layout/Layout";
import { PokemonScreen } from "../../components/pokemonScreen/PokemonScreen";
import { useAppSelector } from "../../utils/hooks";

// Should fetch more pokemon data potentially to provide more info.
const PokemonById = () => {
  const router = useRouter();
  const id = Number(router.asPath.split("/")[2]);
  const allPokemons = useAppSelector((state) => state.pokemons);
  const pokemon = allPokemons.find((pokemon) => pokemon.id === id);
  return (
    <Layout>
      <PokemonScreen data={pokemon} />;
    </Layout>
  );
};

export default PokemonById;
