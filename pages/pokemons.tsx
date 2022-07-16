import React from "react";
import { SearchForm } from "../components/forms/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { getUserFavourites } from "../database";

// it should load on start first ~20 pokemons from an API
export async function getServerProps() {
  // userFavourites: Array<number>
  let userFavourites;
  let data;
  try {
    userFavourites = await getUserFavourites();
  } catch (e) {
    throw new Error();
  }
  // if (userFavourites) {

  // }
  //   const result = await Promise.all([
  //     fetcher("/t.json"),
  //     fetcher("/tt.json"),
  //     fetcher("/ttt.json"),
  //   ]);
  return {
    props: { userFavourites },
  };
}

export const Pokemons = (props) => {
  console.log(props);
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
