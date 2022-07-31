import React from "react";
import { POKEMON_INITIAL_STATE } from "../../../utils/constants";

const initialState = {
  ...POKEMON_INITIAL_STATE,
  inRecent: false,
  inModal: false,
  isHovered: false,
};
export const PokemonCardContext = React.createContext(initialState);
