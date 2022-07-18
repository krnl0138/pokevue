import React, { useEffect, useState } from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { SearchAllPokemons } from "../components/searchAllPokemons/SearchAllPokemons";
import { Pokemon } from "../utils/types";
import { getPokemon } from "../lib/api/getPokemon";
import { NUM_ALL_POKEMONS_CADS } from "../utils/constants";

// it should load on start first ~20 pokemons from an API, ServerProps??
export const Pokemons = () => {
  // TODO basic implementation => move to redux slice
  // TODO is it possible to populate filtered List diffently?
  const [pokemonsList, setPokemonsList] = useState<Array<Pokemon>>([]);
  const [filteredList, setFilteredList] = useState<Array<Pokemon>>([]);

  const handleOnChange = (query: string) => {
    if (!query) {
      return setFilteredList(pokemonsList);
    }
    const pokemonsFromQuery = pokemonsList.filter((pokemon) =>
      pokemon.pokemonData.name.includes(query)
    );
    setFilteredList(pokemonsFromQuery);
  };

  // TODO save to redux once it is loaded to speed up ?
  // Load pokemons from client-side
  const createRandomIds = (limit: number) => {
    const arr = [];
    for (let i = 0; i < limit; i++) {
      arr[i] = Math.floor(Math.random() * 905);
    }
    return arr;
  };
  useEffect(() => {
    const getAllPokemons = async () => {
      const ids = createRandomIds(NUM_ALL_POKEMONS_CADS);
      const pokemons = await Promise.all(
        ids.map(async (id) => await getPokemon(id))
      );
      setPokemonsList(pokemons);
      setFilteredList(pokemons);
    };
    getAllPokemons();
  }, []);

  if (!pokemonsList.length) {
    return <p>Loading pokemons...</p>;
  }

  return (
    pokemonsList.length > 0 && (
      <ProtectedRoute>
        <Layout>
          <SearchAllPokemons onChange={handleOnChange} />
          <AllPokemons pokemons={filteredList} />
          <ModalWrapper>
            <PokemonCard fromModal={true} />
          </ModalWrapper>
        </Layout>
      </ProtectedRoute>
    )
  );
};

export default Pokemons;
