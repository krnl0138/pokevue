import React, { useEffect } from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { FilterBar } from "../components/filterBar/FilterBar";
import { Pokemon } from "../utils/types";
import { getPokemon } from "../lib/api/getPokemon";
import { NUM_RANDOM_POKEMON_CADRS } from "../utils/constants";
import { createRandomIds } from "../utils/functions";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {
  addPokemon,
  addRandomPokemon,
  removePokemon,
} from "../lib/redux/slices/pokemonsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../lib/redux";

const selectRandomsToRemove = createSelector(
  (state: RootState) => state.pokemons.randomIds,
  (state: RootState) => state.pokemons.favouriteIds,
  (state: RootState) => state.pokemons.recentIds,
  (randIds, favIds, recentIds) =>
    randIds?.filter((id) => !recentIds.includes(id) && !favIds.includes(id))
);

export async function getServerSideProps() {
  const ids = createRandomIds(NUM_RANDOM_POKEMON_CADRS);
  const fetchedPokemons = await Promise.all(
    ids.map(async (id) => await getPokemon(id))
  );

  return { props: { fetchedPokemons } };
}

export const Pokemons = ({
  fetchedPokemons,
}: {
  fetchedPokemons: Pokemon[];
}) => {
  const dispatch = useAppDispatch();

  // Dispatch random pokemons to store
  // TODO error handling
  useEffect(() => {
    const getRandomPokemons = async () => {
      fetchedPokemons.forEach((pok) => {
        dispatch(addPokemon(pok));
        dispatch(addRandomPokemon(pok.id));
      });
    };
    getRandomPokemons();
  }, []);

  // remove unused randoms from store on unmount
  // replace to test createSelector() -> still not working
  const randomIds = useAppSelector((state) => state.pokemons.randomIds);
  const favIds = useAppSelector((state) => state.pokemons.favouriteIds);
  const recIds = useAppSelector((state) => state.pokemons.recentIds);
  const randomsToRemove = randomIds?.filter(
    (id) => !recIds.includes(id) && !favIds.includes(id)
  );

  // TODO it doesn't listen correctly
  // const randomsToRemove = useAppSelector(selectRandomsToRemove);
  useEffect(
    () => () => {
      console.log("randomsToRemove: ", randomsToRemove);
      return randomsToRemove.forEach((id) => dispatch(removePokemon(id)));
    },
    []
  );

  // filter logic
  const filter = useAppSelector((state) => state.filterBar.value);
  const pokemons = useAppSelector((state) => state.pokemons.byId);
  const randoms = randomIds.map((id) => pokemons[id]);
  const filteredIds = randoms
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar />
        {randomIds.length > 0 && (
          <PokemonCards
            ids={filteredIds.length > 0 ? filteredIds : randomIds}
          />
        )}
        <ModalWrapper>
          <PokemonCard fromModal={true} />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Pokemons;
