import React, { useState } from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/Layout";
import { Modal } from "@mui/material";
import { RecentSearch } from "../components/recentSearch/RecentSearch";

export const App = () => {
  // current pokemon state
  const [searchValue, setSearchValue] = useState("");

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Layout>
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
      <RecentSearch />
      {openModal && (
        <Modal open={openModal} onClose={handleClose}>
          <PokemonCard />
        </Modal>
      )}
    </Layout>
  );
};

export default App;
