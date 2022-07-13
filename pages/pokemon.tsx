import { TRecentSearch } from "../utils/types";
import React, { useState } from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/Layout";
import { Modal } from "@mui/material";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { PokemonContext } from "../lib/test-pokemon-context";

export const App = () => {
  // current pokemon state
  const [searchValue, setSearchValue] = useState("");
  // TODO type casting
  const [currentPokemon, setCurrentPokemon] = useState<any>(null);
  // TODO type casting
  const [currentPokemonSpecies, setCurrentPokemonSpecies] = useState<any>(null);

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Layout>
      {/* DELETE this line, just testing context*/}
      <PokemonContext.Provider value={currentPokemon}>
        <SearchForm
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setCurrentPokemon={setCurrentPokemon}
          setCurrentPokemonSpecies={setCurrentPokemonSpecies}
        />
        <RecentSearch />
        <PokemonCard openModal={handleOpen} />
        {openModal && (
          <Modal open={openModal} onClose={handleClose}>
            <PokemonCard />
          </Modal>
        )}
      </PokemonContext.Provider>
    </Layout>
  );
};

export default App;
