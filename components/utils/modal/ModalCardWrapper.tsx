import Modal from "@mui/material/Modal";
import React from "react";
import { closeModal } from "../../../lib/redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { PokemonCard } from "../../pokemonCards/pokemonCard/PokemonCard";

export const ModalCardWrapper = () => {
  const dispatch = useAppDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const modalData = useAppSelector((state) => state.modal.data);
  const allIds = useAppSelector((state) => state.pokemons.allIds);

  return (isModalOpen &&
    typeof modalData === "number" &&
    allIds.includes(modalData) && (
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PokemonCard id={modalData} />
      </Modal>
    )) as JSX.Element;
};
