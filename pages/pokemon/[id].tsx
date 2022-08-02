import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useEffect, useState } from "react";
import { PokemonDetailed } from "../../components/pokemonDetailed/PokemonDetailed";
import { ProtectedRoute } from "../../components/protectedRoute/ProtectedRoute";
import { Layout } from "../../components/utils/layout/Layout";
import { dbInterface } from "../../lib/api/dbInterface";
import { fetchEvolution } from "../../lib/api/fetchEvolution";
import {
  addPokemons,
  getPokemon,
  selectPokemonById,
} from "../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TPokemon } from "../../utils/types";

// TODO should do SSR with its own richer parse function or render from client store?
export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("proceed to server props");
  if (!context.params) {
    throw new Error("No params we're passed in path");
  }
  const { id } = context.params;
  if (typeof id !== "string") {
    throw new Error("No id was provided or the id is not a string");
  }
  console.log("calling evolutionPokemons function");
  const evolutionPokemons = await fetchEvolution(id);
  return {
    props: { ...evolutionPokemons },
  };
};

// TODO grab from store by id only if not grab from 1st evo
const Pokemon = (evolutionPokemons: TPokemon[]) => {
  console.log("evolution pokemons in Pokemon are: ", evolutionPokemons);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathId = router.asPath.split("/")[2];
  const id = Number(pathId);
  const pokemon = useAppSelector((state) => selectPokemonById(state, id));
  const db = dbInterface();
  const [loaded, setLoaded] = useState(false);

  /* Populate evolution chain pokemons to the store */
  useEffect(() => {
    if (!evolutionPokemons) return;
    const evo = Object.values(evolutionPokemons);
    if (evo.length === 0) return;
    const populateEvo = () => {
      dispatch(addPokemons(evo));
    };
    populateEvo();
  }, [evolutionPokemons]);

  useEffect(() => {
    if (pokemon) {
      setLoaded(true);
      return;
    }
    const loadPokemon = async (id: number) => {
      console.log("loading Pokemon");
      try {
        await dispatch(getPokemon(id));
        setLoaded(true);
      } catch (error) {
        throw new Error(`An error occured while fetching a pokemon ${error}`);
      }
    };
    loadPokemon(id);
  }, [pokemon]);

  useEffect(() => {
    if (!loaded) return;
    db.getComments(id);
  }, [loaded]);

  return (
    <ProtectedRoute>
      <Layout>
        {pokemon ? (
          <PokemonDetailed
            id={id}
            pokemon={pokemon}
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
