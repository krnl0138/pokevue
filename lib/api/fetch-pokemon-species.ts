import { pokemonAPI } from "../../utils/constants";
import { PokemonSpecies } from "../../utils/types";

export async function fetchPokemonSpecies(name = "persian") {
  const url = `${pokemonAPI}/pokemon-species/${name}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  const data: PokemonSpecies = await res.json();

  return data;
}
