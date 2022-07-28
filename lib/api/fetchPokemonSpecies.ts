import { POKEMON_API } from "../../utils/constants";
import { TPokemonSpeciesResponse } from "../../utils/types";

export async function fetchPokemonSpecies(search: string | number) {
  const url = `${POKEMON_API}/pokemon-species/${search}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    throw new Error(
      "There was an error: fetchPokemonSpecies couldn't load data"
    );
  }
  const data: TPokemonSpeciesResponse = await res.json();

  return data;
}
