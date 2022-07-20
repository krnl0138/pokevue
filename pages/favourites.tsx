import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { FilterBar } from "../components/filterBar/FilterBar";

export const Favourites = () => {
  const favIds = useAppSelector((state) => state.pokemons.favouriteIds);

  // filter logic

  const filter = useAppSelector((state) => state.filterBar.filterValue);
  const pokemons = useAppSelector((state) => state.pokemons.byId);
  const favs = favIds.map((id) => pokemons[id]);
  const filterIds = favs
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar />
        {favIds.length > 0 && (
          <PokemonCards ids={filterIds.length > 0 ? filterIds : favIds} />
        )}
        <ModalWrapper>
          <PokemonCard fromModal={true} />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
