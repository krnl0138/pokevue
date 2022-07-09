import { Pokemon } from "../utils/types";
import React, { useState } from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/Layout";
import { Modal } from "@mui/material";

export const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState({} as Pokemon);
  const [currentPokemonSpecies, setCurrentPokemonSpecies] = useState([] as any);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Layout>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPokemon={setCurrentPokemon}
        setCurrentPokemonSpecies={setCurrentPokemonSpecies}
      />
      <PokemonCard
        openModal={handleOpen}
        currentPokemon={currentPokemon}
        currentPokemonSpecies={currentPokemonSpecies}
      />
      {openModal && (
        <Modal open={openModal} onClose={handleClose}>
          <PokemonCard
            currentPokemon={currentPokemon}
            currentPokemonSpecies={currentPokemonSpecies}
          />
        </Modal>
      )}
    </Layout>
  );
};

export default App;
