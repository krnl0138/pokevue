import { OpenInFull } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { openModal } from "../../../../../lib/redux/slices/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks";
import { PokemonCardContext } from "../../pokemonCardContext";

const styleExpandIcon = {
  marginLeft: "5px",
  marginRight: "2px",
  alignSelf: "center",
  ":hover": { color: "#1976d2" },
};

export const PokemonCardHeaderAction = () => {
  const { id } = useContext(PokemonCardContext);
  const dispatch = useAppDispatch();
  const { inModal, isHovered } = useContext(PokemonCardContext);
  return inModal ? null : (
    <IconButton onClick={() => dispatch(openModal(id))} sx={styleExpandIcon}>
      {isHovered ? <OpenInFull fontSize="small" /> : null}
    </IconButton>
  );
};
