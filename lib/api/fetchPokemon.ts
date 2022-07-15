import { POKEMON_API } from "../../utils/constants";
import { PokemonResponse } from "../../utils/types";

export async function fetchPokemon(name = "persian") {
  const url = `${POKEMON_API}/pokemon/${name}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  const data: PokemonResponse = await res.json();

  return data;
}
