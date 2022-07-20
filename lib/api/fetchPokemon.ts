import { POKEMON_API } from "../../utils/constants";
import { PokemonResponse } from "../../utils/types";

export async function fetchPokemon(search: number | string) {
  const url = `${POKEMON_API}/pokemon/${search}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  const data: PokemonResponse = await res.json();

  return data;
}
