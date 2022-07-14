import React, { useState } from "react";
import { SearchForm } from "../components/searchForm/SearchForm";
import { PokemonCard } from "../components/pokemonCard/PokemonCard";
import { Layout } from "../components/layout/Layout";
import { RecentSearch } from "../components/recentSearch/RecentSearch";
import { useAppSelector } from "../utils/hooks";
import { ModalView } from "../components/modalView/ModalView";

export const App = () => {
  // current pokemon state
  const [searchValue, setSearchValue] = useState("");

  // modal state
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const modalData = useAppSelector((state) => state.modal.data);
  // const [openModal, setOpenModal] = useState(false);
  // const handleOpen = () => setOpenModal(true);
  // const handleClose = () => setOpenModal(false);

  return (
    <Layout>
      <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} />
      <RecentSearch />
      {isModalOpen && (
        // <Modal open={openModal} onClose={handleClose}>
        <ModalView>
          {/* <p>Hello world</p> */}
          <PokemonCard data={modalData} />
        </ModalView>
      )}
    </Layout>
  );
};

export default App;
