import { useRouter } from "next/router";
import { Layout } from "../../components/utils/layout/Layout";
import { PokemonScreen } from "../../components/pokemonScreen/PokemonScreen";
import { useAppSelector } from "../../utils/hooks";

const NoPokemonScreen = () => {
  return <p>Something is wrong. No pokemon was found.</p>;
};

// Should fetch more pokemon data potentially to provide more info.
// TODO should be ProtectedRoute with redirect at '/pokemon' if no id was provided
const PokemonById = () => {
  const router = useRouter();
  const id = Number(router.asPath.split("/")[2]);
  const allPokemons = useAppSelector((state) => state.pokemons);
  const pokemon = allPokemons.find((pokemon) => pokemon.id === id);
  return (
    <Layout>
      {pokemon ? <PokemonScreen data={pokemon} /> : <NoPokemonScreen />}
    </Layout>
  );
};

export default PokemonById;
