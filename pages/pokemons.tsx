import React from "react";
import { SearchForm } from "../components/forms/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";

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

export const Pokemons = () => {
  return (
    <Layout>
      <SearchForm />
      <AllPokemons />
      <ModalWrapper>
        <PokemonCard fromModal={true} />
      </ModalWrapper>
    </Layout>
  );
};

export default Pokemons;
