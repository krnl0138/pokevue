import { fetchPokemon } from "./fetch-pokemon";
import { fetchPokemonSpecies } from "./fetch-pokemon-species";

export const getPokemon = async (search) => {
  const pokemon = await fetchPokemon(search);
  const pokemonSpecies = await fetchPokemonSpecies(search);
  return [pokemon, pokemonSpecies];
};
