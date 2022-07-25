import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { FilterBar } from "../components/filterBar/FilterBar";
import { ModalCardWrapper } from "../components/utils/modal/ModalCardWrapper";
import {
  selectAllPokemons,
  selectRecentIds,
} from "../lib/redux/slices/pokemonsSlice";
import { selectFilterBarValue } from "../lib/redux/slices/filterBarSlice";

export const Index = () => {
  const recentIds = useAppSelector(selectRecentIds);
  // filter logic
  const filter = useAppSelector(selectFilterBarValue);
  const pokemons = useAppSelector(selectAllPokemons);
  const recents = recentIds.map((id) => pokemons[id]);
  const filterIds = recents
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);
  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar withSearch={true} />
        <PokemonCards inRecent={true} ids={filterIds ? filterIds : recentIds} />
        <ModalCardWrapper />
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
