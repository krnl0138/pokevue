import { TPokemon } from "../../utils/types";
import { getPokemon } from "./getPokemon";

export async function fetchEvolution(search: number | string) {
  const result: TPokemon[] = [];
  const recursive = async (search: number | string) => {
    const pokemon = await getPokemon(search);
    result.push(pokemon);
    const evoName = pokemon.pokemonData.evolutionName;
    if (evoName !== null && evoName !== undefined) {
      await recursive(evoName);
    } else {
      return;
    }
  };
  await recursive(search);
  return result;
}
