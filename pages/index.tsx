import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { FilterBar } from "../components/filterBar/FilterBar";

export const Index = () => {
  const recentIds = useAppSelector((state) => state.pokemons.recentIds);
  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar withSearch={true} />
        <PokemonCards ids={recentIds} />
        <ModalWrapper>
          <PokemonCard fromModal={true} />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
