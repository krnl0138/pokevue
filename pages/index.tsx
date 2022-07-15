import React from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { ModalWrapper } from "../components/modalWrapper/modalWrapper";

export const Index = () => {
  return (
    <Layout>
      <SearchForm />
      <RecentSearch />
      <ModalWrapper>
        <PokemonCard />
      </ModalWrapper>
    </Layout>
  );
};

export default Index;
