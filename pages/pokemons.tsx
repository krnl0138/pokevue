import React from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modalWrapper/modalWrapper";

// it should load on start first ~20 pokemons from an API
export async function getStaticProps() {
  //   const result = await Promise.all([
  //     fetcher("/t.json"),
  //     fetcher("/tt.json"),
  //     fetcher("/ttt.json"),
  //   ]);
  // return {
  //   props: { result },
  // };
}

export const Pokemons = ({ result }) => {
  console.log(result);

  return (
    <Layout>
      <SearchForm />
      <AllPokemons />
      <ModalWrapper>
        <PokemonCard />
      </ModalWrapper>
    </Layout>
  );
};

export default Pokemons;
