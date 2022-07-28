import { fetchPokemon } from "./fetchPokemon";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";
import { parsePokemon } from "./parsePokemon";

export const getPokemon = async (search: string | number) => {
  console.log("getPokemon was CALLED for id: ", search);
  const [pokemon, pokemonSpecies] = await Promise.all([
    fetchPokemon(search),
    fetchPokemonSpecies(search),
  ]);
  const data = parsePokemon({ pokemon, pokemonSpecies });
  const result = {
    ...data,
    ratingAverage: -Infinity,
    comments: [],
    isRandom: false,
    isFavourite: false,
    isRecent: false,
  };
  return { ...result };
};
