import { PokemonResponse, PokemonSpeciesResponse } from "../../utils/types";
const parsePokemon = (data: {
  pokemon: PokemonResponse;
  pokemonSpecies: PokemonSpeciesResponse;
}) => {
  const { pokemon, pokemonSpecies } = data;
  const id = pokemon.id;
  const name = pokemon.name;
  const avatar = pokemon.sprites?.other["official-artwork"].front_default;
  const flavors = pokemonSpecies.flavor_text_entries
    .slice(1, 3)
    .flatMap((flavor) => `${flavor.flavor_text}\n`);
  return { id, pokemonData: { name, avatar, flavors } };
};

export const getPokemon = async (search: string) => {
  //   const pokemon = await fetchPokemon(search);
  //   const pokemonSpecies = await fetchPokemonSpecies(search);
  // Offline test variant
  const pokemonRes = await fetch(`/${search}.json`);
  const pokemon: PokemonResponse = await pokemonRes.json();
  const pokemonSpeciesRes = await fetch("/pokemonSpeciesReturnedAPI.json");
  const pokemonSpecies: PokemonSpeciesResponse = await pokemonSpeciesRes.json();

  const data = parsePokemon({ pokemon, pokemonSpecies });

  return { ...data };
};
