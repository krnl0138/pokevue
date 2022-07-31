import { TPokemon } from "../../utils/types";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";
import { retrievePokemon } from "./retrievePokemon";

/*
 * Just for the practise purpose we recursively fetch
 * all pokemons aside the first one bc we it was fetched
 * on the client-side.
 * It is better and easier to SSR all evolution-chain.
 */
export async function fetchEvolution(search: number | string) {
  const result: TPokemon[] = [];
  const first = await fetchPokemonSpecies(search);
  const firstEvoName = first.evolves_from_species?.name;
  if (!firstEvoName) return;

  const recursive = async (search: number | string) => {
    console.log("search inside recursive is: ", search);
    const pokemon = await retrievePokemon(search);
    result.push(pokemon);
    const evoName = pokemon.pokemonData.evolutionName;

    // base case
    if (!evoName) {
      return;
    } else {
      await recursive(evoName);
    }
  };
  try {
    await recursive(firstEvoName);
  } catch (error) {
    throw new Error("An error occured while fetching evolution pokemons");
  }
  return result;
}
