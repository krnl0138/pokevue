import { Pokemon } from "../utils/types";
import React, { useState } from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout";

export const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState({} as Pokemon);
  const [currentPokemonSpecies, setCurrentPokemonSpecies] = useState([] as any);

  return (
    <Layout>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPokemon={setCurrentPokemon}
        setCurrentPokemonSpecies={setCurrentPokemonSpecies}
      />
      <PokemonCard
        currentPokemon={currentPokemon}
        currentPokemonSpecies={currentPokemonSpecies}
      />
    </Layout>
  );
};

export default App;
