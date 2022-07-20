import React, { useEffect, useState } from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { SearchAllPokemons } from "../components/searchAllPokemons/SearchAllPokemons";
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

const selectRandomPokemons = createSelector(
  (state: RootState) => state.pokemons.byId,
  (state: RootState) => state.pokemons.randomIds,
  (pokemons, randomIds) => randomIds?.map((id) => pokemons[id])
);

const selectPokemonsToRemove = createSelector(
  (state: RootState) => state.pokemons.randomIds,
  (state: RootState) => state.pokemons.favouriteIds,
  (state: RootState) => state.pokemons.recentIds,
  (randIds, favIds, recentIds) => {
    console.log("FIRED selectPokemonsToRemove");
    console.log("randIds: ", randIds);
    const selected = randIds?.filter(
      (id) => !recentIds.includes(id) && !favIds.includes(id)
    );
    console.log("selected: ", selected);
    return selected;
  }
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
  // TODO is it possible to populate filtered List diffently?
  const [filteredList, setFilteredList] = useState<Array<Pokemon>>([]);
  const randomPokemons = useAppSelector(selectRandomPokemons);
  const pokemonsToRemove = useAppSelector(selectPokemonsToRemove);
  console.log("randomPokemons is: ", randomPokemons);
  console.log("pokemonsToRemove is: ", pokemonsToRemove);

  const handleOnChange = (query: string) => {
    if (!query) return setFilteredList(randomPokemons);

    const pokemonsFromQuery = randomPokemons.filter((pokemon) =>
      pokemon.pokemonData.name.includes(query)
    );
    setFilteredList(pokemonsFromQuery);
  };

  // Dispatch fetched from client-side
  // TODO error handling
  useEffect(() => {
    const getRandomPokemons = async () => {
      fetchedPokemons.forEach((pok) => {
        dispatch(addPokemon(pok));
        dispatch(addRandomPokemon(pok.id));
      });
      setFilteredList(fetchedPokemons);
    };
    getRandomPokemons();
  }, []);

  // remove randoms from store
  // TODO it doesn't listen correctly
  useEffect(
    () => () => {
      console.log(
        "start return useeffect with pokemonsToRemove:",
        pokemonsToRemove
      );
      // randomPokemons?.forEach((pok) => {
      //   if (pok.isFavourite === true || pok.isRecent === true) {
      pokemonsToRemove?.forEach((id) => dispatch(removePokemon(id)));
    },
    []
  );

  return (
    <ProtectedRoute>
      <Layout>
        <SearchAllPokemons onChange={handleOnChange} />
        {randomPokemons.length > 0 && (
          <>
            <AllPokemons pokemons={filteredList} />
            <ModalWrapper>
              <PokemonCard fromModal={true} />
            </ModalWrapper>
          </>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Pokemons;
