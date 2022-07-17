import React from "react";
import { SearchForm } from "../components/forms/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";

import { AllPokemons } from "../components/allPokemons/AllPokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";

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
  return (
    <ProtectedRoute>
      <Layout>
        <SearchForm />
        <AllPokemons />
        <ModalWrapper>
          <PokemonCard fromModal={true} />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Pokemons;
