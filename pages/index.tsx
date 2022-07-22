import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { FilterBar } from "../components/filterBar/FilterBar";
import { ModalCardWrapper } from "../components/utils/modal/ModalCardWrapper";

export const Index = () => {
  const recentIds = useAppSelector((state) => state.pokemons.recentIds);
  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar withSearch={true} />
        <PokemonCards inRecent={true} ids={recentIds} />
        <ModalCardWrapper />
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
