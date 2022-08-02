import { TChainResponse, TPokemon } from "../../utils/types";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";
import { retrievePokemon } from "./retrievePokemon";

/*
 * Recursively fetch pokemons data from the API 'chain' endpoint
 */
export const fetchEvolution = async (search: number | string) => {
  const species = await fetchPokemonSpecies(search);
  if (!species.evolves_from_species) {
    const pokemon = await retrievePokemon(search);
    return { pokemon };
  }
  const request = await fetch(species.evolution_chain.url);
  const data: TChainResponse = await request.json();
  const chain = data.chain;

  const result: TPokemon[] = [];

  const first = await retrievePokemon(chain.species.name);
  result.push(first);

  const recursive = async (chain: TChainResponse["chain"]["evolves_to"][0]) => {
    if ((chain.evolves_to.length as any) !== 0) {
      const pokemon = await retrievePokemon(chain.species.name);
      result.push(pokemon);
      await recursive(chain.evolves_to[0] as any);
    } else {
      const pokemon = await retrievePokemon(chain.species.name);
      result.push(pokemon);
      return;
    }
  };

  await recursive(chain.evolves_to[0]);
  return result;
};
