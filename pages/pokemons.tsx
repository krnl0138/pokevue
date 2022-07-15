import React from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";
import { useAppSelector } from "../utils/hooks";
import { ModalView } from "../components/modalView/ModalView";

import { AllPokemons } from "../components/allPokemons/AllPokemons";

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
  // modal state
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const modalData = useAppSelector((state) => state.modal.data);

  return (
    <Layout>
      <SearchForm />
      <AllPokemons />
      {isModalOpen && (
        <ModalView>
          <PokemonCard data={modalData} />
        </ModalView>
      )}
    </Layout>
  );
};

export default Pokemons;
