import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { FavouritePokemons } from "../components/favouritePokemons/FavouritePokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";

export const Favourites = () => {
  return (
    <Layout>
      <FavouritePokemons />
      <ModalWrapper>
        <PokemonCard />
      </ModalWrapper>
    </Layout>
  );
};

export default Favourites;
