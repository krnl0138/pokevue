import React from "react";
import { useAppSelector } from "../../utils/hooks";
import { ModalView } from "../modalView/ModalView";
import { PokemonCard } from "../pokemonCard/PokemonCard";

export const ModalWrapper = ({ children }: { children: JSX.Element }) => {
  // modal state
  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const modalData = useAppSelector((state) => state.modal.data);
  return (
    isModalOpen && (
      <ModalView>
        {React.cloneElement(children, { data: modalData })}
        {/* <children data={modalData} /> */}
      </ModalView>
    )
  );
};
