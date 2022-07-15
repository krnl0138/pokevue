import { POKEMON_API } from "../../utils/constants";
import { PokemonSpeciesResponse } from "../../utils/types";

export async function fetchPokemonSpecies(name = "persian") {
  const url = `${POKEMON_API}/pokemon-species/${name}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  const data: PokemonSpeciesResponse = await res.json();

  return data;
}
