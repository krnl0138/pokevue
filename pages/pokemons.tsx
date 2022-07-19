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
  selectRandomPokemons,
  (pokemons) =>
    pokemons?.filter((p) => p.isFavourite === false && p.isRecent === false)
);

// it should load on start first ~20 pokemons from an API, ServerProps??
export const Pokemons = () => {
  const dispatch = useAppDispatch();
  // TODO is it possible to populate filtered List diffently?
  const [filteredList, setFilteredList] = useState<Array<Pokemon>>([]);
  const randomPokemons = useAppSelector(selectRandomPokemons);
  const pokemonsToRemove = useAppSelector(selectPokemonsToRemove);

  const handleOnChange = (query: string) => {
    if (!query) return setFilteredList(randomPokemons);

    const pokemonsFromQuery = randomPokemons.filter((pokemon) =>
      pokemon.pokemonData.name.includes(query)
    );
    setFilteredList(pokemonsFromQuery);
  };

  // Load pokemons from client-side
  useEffect(() => {
    const getRandomPokemons = async () => {
      const ids = createRandomIds(NUM_RANDOM_POKEMON_CADRS);
      const fetchedPokemons = await Promise.all(
        ids.map(async (id) => await getPokemon(id))
      );
      fetchedPokemons.forEach((pok) => {
        dispatch(addPokemon(pok));
        dispatch(addRandomPokemon(pok.id));
      });
      setFilteredList(fetchedPokemons);
    };
    getRandomPokemons();
    console.log("fired getRandomPokemons");
  }, [dispatch]);

  // remove randoms from store
  useEffect(() => {
    return () => {
      console.log("pokemons to remove is: ", randomPokemons);
      randomPokemons.forEach((p) => {
        console.log(`fired removePokemon for id:${p.id}`);
        dispatch(removePokemon(p.id));
      });
    };
  }, []);

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
