import React from "react";
import { TPokemon } from "../../../utils/types";

const initialState: TPokemon = {
  id: -Infinity,
  isFavourite: false,
  isRecent: false,
  isRandom: false,
  pokemonData: {
    name: "",
    avatarBig: "",
    avatarSmall: "",
    description: "",
    abilities: [{ id: -Infinity, name: "" }],
    stats: [{ id: -Infinity, name: "", value: -Infinity }],
    captureRate: -Infinity,
    isBaby: false,
    isLegendary: false,
    isMythical: false,
    evolutionName: "",
  },
};

export const PokemonCardContext = React.createContext(initialState);
