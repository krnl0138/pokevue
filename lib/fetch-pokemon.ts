import { pokemonAPI } from "../utils/constants";
import { Pokemon } from "../utils/types";

export async function getPokemon(id = "53") {
  const res = await fetch(`${pokemonAPI}/pokemon/${id}/`);
  const data: Pokemon = await res.json();

  return data;
}
