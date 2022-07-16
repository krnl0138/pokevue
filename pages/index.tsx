import React from "react";
import { SearchForm } from "../components/forms/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";

export async function getStaticProps() {
  return {
    props: {},
  };
}

export const Index = () => {
  return (
    <Layout>
      <SearchForm />
      <RecentSearch />
      <ModalWrapper>
        <PokemonCard fromModal={true} />
      </ModalWrapper>
    </Layout>
  );
};

export default Index;
