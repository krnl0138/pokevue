import Modal from "@mui/material/Modal";
import React from "react";
import {
  closeModal,
  selectModalData,
  selectModalStatus,
} from "../../../lib/redux/slices/modalSlice";
import { selectAllIds } from "../../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { PokemonCard } from "../../pokemonCards/pokemonCard/PokemonCard";

export const ModalCardWrapper = () => {
  const dispatch = useAppDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  const isModalOpen = useAppSelector(selectModalStatus);
  const modalData = useAppSelector(selectModalData);
  const allIds = useAppSelector(selectAllIds);

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
