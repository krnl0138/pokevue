import { pokemonAPI } from "../../utils/constants";
import { Pokemon } from "../../utils/types";

export async function fetchPokemon(name = "persian") {
  const url = `${pokemonAPI}/pokemon/${name}/`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const res = await fetch(url, requestOptions);
  const data: Pokemon = await res.json();

  return data;
}
