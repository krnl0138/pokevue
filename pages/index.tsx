import React from "react";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";

export const Index = () => {
  const recentIds = useAppSelector((state) => state.pokemons.recentIds);
  return (
    <ProtectedRoute>
      <Layout>
        <RecentSearch />
        <PokemonCards ids={recentIds} />
        <ModalWrapper>
          <PokemonCard fromModal={true} />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
