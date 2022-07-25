import { createContext } from "react";
import { POKEMON_INITIAL_STATE } from "../../utils/constants";

export const PokemonDetailedContext = createContext(POKEMON_INITIAL_STATE);
