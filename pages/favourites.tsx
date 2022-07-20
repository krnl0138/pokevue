import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";

export const Favourites = () => {
  const favouriteIds = useAppSelector((state) => state.pokemons.favouriteIds);
  return (
    <ProtectedRoute>
      <Layout>
        <PokemonCards ids={favouriteIds} />
        <ModalWrapper>
          <PokemonCard />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
