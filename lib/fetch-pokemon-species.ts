import { pokemonAPI } from "../utils/constants";
import { Pokemon } from "../utils/types";

export async function getPokemonSpecies(id = "53") {
  const res = await fetch(`${pokemonAPI}/pokemon-species/${id}/`);
  const data: Pokemon = await res.json();

  return data;
}
