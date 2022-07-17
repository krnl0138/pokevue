import React, { useEffect, useState } from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { SearchAllPokemons } from "../components/searchAllPokemons/SearchAllPokemons";
import { Pokemon } from "../utils/types";
import { getPokemon } from "../lib/api/getPokemon";

// it should load on start first ~20 pokemons from an API
// export async function getServerProps() {
//   let userFavourites;
//   try {
//     userFavourites = await getUserFavourites();
//   } catch (e) {
//     throw new Error();
//   }
//   return {
//     props: { userFavourites },
//   };
// }

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
  const cardsToLoad = 5;
  useEffect(() => {
    async function getAllPokemons() {
      // TODO refactor with Promise.all ?
      // TODO fire all functions at once ?
      for (let i = 1; i < cardsToLoad + 1; i++) {
        const pokemon = await getPokemon(i);
        // const pokemon = { ...res, isFavourite: false, isRecent: false };
        setPokemonsList((prev) => [...prev, pokemon]);
        setFilteredList((prev) => [...prev, pokemon]);
      }
    }
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
