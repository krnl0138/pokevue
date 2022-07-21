import { CatchingPokemon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { openModal } from "../../../../lib/redux/slices/modalSlice";
import { useAppDispatch } from "../../../../utils/hooks";

export const PokemonCardHeaderAction = ({ id }: { id: number }) => {
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
