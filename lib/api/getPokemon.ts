import { fetchPokemon } from "./fetchPokemon";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";

export const getPokemon = async (search) => {
  const pokemon = await fetchPokemon(search);
  const pokemonSpecies = await fetchPokemonSpecies(search);
  return [pokemon, pokemonSpecies];
};
