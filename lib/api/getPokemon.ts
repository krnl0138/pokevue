import { PokemonResponse, PokemonSpeciesResponse } from "../../utils/types";
import { fetchPokemon } from "./fetchPokemon";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";
import { parsePokemon } from "./parsePokemon";

export const getPokemon = async (search: string) => {
  const pokemon = await fetchPokemon(search);
  const pokemonSpecies = await fetchPokemonSpecies(search);

  // TODO no await?
  const data = parsePokemon({ pokemon, pokemonSpecies });
  const result = {
    ...data,
    isRandom: false,
    isFavourite: false,
    isRecent: false,
  };
  return { ...result };
};

export const getPokemonTest = async (search: string | number) => {
  // Offline test variant
  const pokemonRes = await fetch(`/${search}.json`);
  const pokemon: PokemonResponse = await pokemonRes.json();
  const pokemonSpeciesRes = await fetch("/pokemonSpeciesReturnedAPI.json");
  const pokemonSpecies: PokemonSpeciesResponse = await pokemonSpeciesRes.json();

  const data = parsePokemon({ pokemon, pokemonSpecies });

  const result = {
    ...data,
    isRandom: false,
    isFavourite: false,
    isRecent: false,
  };
  return { ...result };
};
