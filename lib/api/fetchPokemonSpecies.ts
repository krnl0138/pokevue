import { POKEMON_API } from "../../utils/constants";
import { PokemonSpeciesResponse } from "../../utils/types";

export async function fetchPokemonSpecies(search: string | number) {
  const url = `${POKEMON_API}/pokemon-species/${search}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  const data: PokemonSpeciesResponse = await res.json();

  return data;
}
