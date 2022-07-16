import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { FavouritePokemons } from "../components/favouritePokemons/FavouritePokemons";
import { ModalWrapper } from "../components/modal/modalWrapper/modalWrapper";

export const Account = () => {
  return (
    <Layout>
      <FavouritePokemons />
      <ModalWrapper>
        <PokemonCard fromModal={true} />
      </ModalWrapper>
    </Layout>
  );
};

export default Account;
