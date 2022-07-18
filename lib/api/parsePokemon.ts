import { PokemonResponse, PokemonSpeciesResponse } from "../../utils/types";

export const parsePokemon = (data: {
  pokemon: PokemonResponse;
  pokemonSpecies: PokemonSpeciesResponse;
}) => {
  const { pokemon, pokemonSpecies } = data;
  const id = pokemon.id;
  const name = pokemon.name;
  const avatar = pokemon.sprites?.other["official-artwork"].front_default;
  const flavors = pokemonSpecies.flavor_text_entries
    .slice(1, 3)
    .flatMap((flavor) => `${flavor.flavor_text}\n`)
    .join();
  return { id, pokemonData: { name, avatar, flavors } };
};
