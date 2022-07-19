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
import { createRandomIds } from "../utils/functions";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { addPokemon, removePokemon } from "../lib/redux/slices/pokemonsSlice";

// it should load on start first ~20 pokemons from an API, ServerProps??
export const Pokemons = () => {
  const dispatch = useAppDispatch();
  // TODO is it possible to populate filtered List diffently?
  const [filteredList, setFilteredList] = useState<Array<Pokemon>>([]);
  const pokemons = useAppSelector((state) => state.pokemons);
  const randomPokemons = pokemons.filter((pok) => pok.isRandom === true);

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
      const ids = createRandomIds(NUM_ALL_POKEMONS_CADS);
      const fetchedPokemons = await Promise.all(
        ids.map(async (id) => await getPokemon(id))
      );
      fetchedPokemons.forEach((pok) => {
        pok.isRandom = true;
        dispatch(addPokemon(pok));
      });
      setFilteredList(fetchedPokemons);
    };
    getRandomPokemons();
    console.log("fired getRandomPokemons");
  }, [dispatch]);

  // remove randoms from store
  useEffect(() => {
    console.log("pokemons are:", pokemons);
    console.log(
      "favourites are:",
      pokemons.filter((p) => p.isFavourite === true)
    );
    return () => {
      console.log("pokemons are:", pokemons);
      pokemons
        .filter(
          (pok) =>
            pok.isRandom === true && pok.isFavourite === false && pok.isRecent
        )
        .map((pok) => {
          console.log("pokemon to remove: ", pok);
          dispatch(removePokemon(pok.id));
        });
      console.log("randoms were removed.");
    };
  }, [dispatch]);

  if (!randomPokemons.length) {
    return <p>Loading pokemons...</p>;
  }

  return (
    randomPokemons.length > 0 && (
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
