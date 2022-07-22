import { useRouter } from "next/router";
import { Layout } from "../../components/utils/layout/Layout";
import { PokemonDetailed } from "../../components/pokemonDetailed/PokemonDetailed";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { ProtectedRoute } from "../../components/protectedRoute/ProtectedRoute";
import { getPokemon } from "../../lib/api/getPokemon";
import { addPokemon, selectPokemonById } from "../../lib/redux/slices/pokemonsSlice";
import { CircularProgress } from "@mui/material";
import { GetServerSideProps } from "next/types";
import { fetchEvolution } from "../../lib/api/fetchEvolution";
import { TPokemon } from "../../utils/types";

// TODO should do SSR with its own richer parse function or render from client store?
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) throw new Error("no params");
  const { id } = context.params;
  if (!id || Array.isArray(id)) throw new Error("no id or id is an array");
  const evolutionPokemons = await fetchEvolution(id);
  console.log(evolutionPokemons);
  if (!evolutionPokemons) throw new Error("no evolutionPokemons was returned");
  return {
    props: { ...evolutionPokemons },
  };
};

// TODO grab from store by id only if not grab from 1st evo
const Pokemon = (evolutionPokemons: TPokemon[]) => {
  console.log(evolutionPokemons[0]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.asPath.split("/")[2];
  const pokemon = useAppSelector(state => selectPokemonById(state,Number(id)));

  // hotfix, sometimes router returns '[id]' string
  if (id === "[id]") return <CircularProgress />;

  const loadPokemon = async (id: number) => {
    if (evolutionPokemons) {
      Object.values(evolutionPokemons).forEach((p) => dispatch(addPokemon(p)));
      return;
    }
    console.log("id is:", id);
    if (!id) return;
    const pokemon = await getPokemon(id);
    console.log("returned pokemon from getPokemon is: ", pokemon);
    dispatch(addPokemon(pokemon));
  };
  if (!pokemon) loadPokemon(Number(id));

  return (
    <ProtectedRoute>
      <Layout>
        {pokemon ? (
          <PokemonDetailed
            id={Number(id)}
            pokemon={evolutionPokemons[0]}
            evolutionPokemons={evolutionPokemons}
          />
        ) : (
          <CircularProgress />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Pokemon;
