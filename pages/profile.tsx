import React from "react";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";
import { useAppSelector } from "../utils/hooks";
import { ModalView } from "../components/modalView/ModalView";
import { FavouritePokemons } from "../components/favouritePokemons/FavouritePokemons";

export const Profile = () => {
  // modal state
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const modalData = useAppSelector((state) => state.modal.data);

  return (
    <Layout>
      <FavouritePokemons />
      {isModalOpen && (
        <ModalView>
          <PokemonCard data={modalData} isProfile={true} />
        </ModalView>
      )}
    </Layout>
  );
};

export default Profile;
