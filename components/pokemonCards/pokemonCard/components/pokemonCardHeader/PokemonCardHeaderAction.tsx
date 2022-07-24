import { CatchingPokemon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { openModal } from "../../../../../lib/redux/slices/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks";
import { PokemonCardContext } from "../../pokemonCardContext";

export const PokemonCardHeaderAction = () => {
  const { id } = useContext(PokemonCardContext);
  const dispatch = useAppDispatch();
  // TODO check if it displayed correctly
  const handleOpenModal = () => {
    dispatch(openModal(id));
  };
  return (
    <IconButton
      onClick={handleOpenModal}
      sx={{
        alignSelf: "center",
        ":hover": { color: "#1976d2" },
      }}
    >
      <CatchingPokemon />
    </IconButton>
  );
};
