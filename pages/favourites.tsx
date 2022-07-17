import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { FavouritePokemons } from "../components/favouritePokemons/FavouritePokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";

export const Favourites = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <FavouritePokemons />
        <ModalWrapper>
          <PokemonCard />
        </ModalWrapper>
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
