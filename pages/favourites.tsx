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
  const filter = useAppSelector((state) => state.filterBar.value);
  const pokemons = useAppSelector((state) => state.pokemons.byId);
  const favs = favIds.map((id) => pokemons[id]);
  const filteredIds = favs
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar />
        <PokemonCards ids={favouriteIds} />
        <ModalWrapper>
          <PokemonCard />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
