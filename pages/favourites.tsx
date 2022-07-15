import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";
import { FavouritePokemons } from "../components/favouritePokemons/FavouritePokemons";
import { ModalWrapper } from "../components/modalWrapper/modalWrapper";

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
