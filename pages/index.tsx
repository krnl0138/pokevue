import React from "react";
import { SearchForm } from "../components/forms/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/protectedRoute";

export const Index = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <SearchForm />
        <RecentSearch />
        <ModalWrapper>
          <PokemonCard fromModal={true} />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
