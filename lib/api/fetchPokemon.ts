import { POKEMON_API } from "../../utils/constants";
import { TPokemonResponse } from "../../utils/types";

export async function fetchPokemon(search: number | string) {
  const url = `${POKEMON_API}/pokemon/${search}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  if (!res.ok) {
    throw new Error('There was an error: fetchPokemon couldn\'t load data')
  }
  const data: TPokemonResponse = await res.json();

  return data;
}
