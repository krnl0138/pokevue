import { TPokemonResponse, TPokemonSpeciesResponse } from "../../utils/types";
import { fetchPokemon } from "./fetchPokemon";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";
import { parsePokemon } from "./parsePokemon";

export const getPokemon = async (search: string | number) => {
  const pokemon = await fetchPokemon(search);
  const pokemonSpecies = await fetchPokemonSpecies(search);

  // TODO no await?
  // TODO should be different for each entitiy?
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
  const pokemon: TPokemonResponse = await pokemonRes.json();
  const pokemonSpeciesRes = await fetch("/pokemonSpeciesReturnedAPI.json");
  const pokemonSpecies: TPokemonSpeciesResponse =
    await pokemonSpeciesRes.json();

  const data = parsePokemon({ pokemon, pokemonSpecies });

  const result = {
    ...data,
    isRandom: false,
    isFavourite: false,
    isRecent: false,
  };
  return { ...result };
};
