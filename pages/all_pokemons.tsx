import React from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { useAppSelector } from "../utils/hooks";
import { ModalView } from "../components/modalView/ModalView";

export const AllPokemons = () => {
  // modal state
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const modalData = useAppSelector((state) => state.modal.data);

  return (
    <Layout>
      <SearchForm />
      <RecentSearch />
      {isModalOpen && (
        <ModalView>
          <PokemonCard data={modalData} />
        </ModalView>
      )}
    </Layout>
  );
};

export default AllPokemons;
