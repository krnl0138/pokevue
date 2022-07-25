import { dbGetAverageRating } from "../../firebase/dbRatings";
import { TPokemonResponse, TPokemonSpeciesResponse } from "../../utils/types";
import { fetchPokemon } from "./fetchPokemon";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";
import { parsePokemon } from "./parsePokemon";

export const getPokemon = async (search: string | number) => {
  console.log("getPokemon was CALLED for id: ", search);
  const [pokemon, pokemonSpecies] = await Promise.all([
    fetchPokemon(search),
    fetchPokemonSpecies(search),
  ]);
  console.log("pokemon from getPokemon is: ", pokemon);
  // TODO no await?
  // TODO should be different for each entitiy?
  const data = parsePokemon({ pokemon, pokemonSpecies });
  console.log("pokemon from parsePokemon is: ", data);
  const pokemonId = data.id;
  console.log(
    "dbGetAverageRating from getPokemon was called for id",
    pokemonId
  );
  // TODO should it wait?
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
