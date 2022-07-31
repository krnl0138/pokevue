import { Dialog } from "@mui/material";
import React from "react";
import {
  closeModal,
  selectModalData,
  selectModalStatus,
} from "../../../lib/redux/slices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { PokemonCard } from "../../pokemonCards/pokemonCard/PokemonCard";

export const ModalCardWrapper = () => {
  const dispatch = useAppDispatch();
  const handleModalClose = () => dispatch(closeModal());
  const isModalOpen = useAppSelector(selectModalStatus);
  const modalData = useAppSelector(selectModalData);

  return typeof modalData === "number" ? (
    <Dialog
      open={isModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <PokemonCard id={modalData} inModal={true} />
    </Dialog>
  ) : null;
};
