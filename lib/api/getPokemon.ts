import { fetchPokemon } from "./fetchPokemon";
import { fetchPokemonSpecies } from "./fetchPokemonSpecies";

const parsePokemon = (data) => {
  const { pokemon, pokemonSpecies } = data;
  const id = pokemon.id;
  const name = pokemon.name;
  const avatar = pokemon.sprites?.other["official-artwork"].front_default;
  const flavors = pokemonSpecies.flavor_text_entries
    .slice(1, 3)
    .flatMap((flavor) => `${flavor.flavor_text}\n`);
  return { id, pokemonData: { name, avatar, flavors } };
};

export const getPokemon = async (search) => {
  //   const pokemon = await fetchPokemon(search);
  //   const pokemonSpecies = await fetchPokemonSpecies(search);
  // Offline test variant
  const pokemonRes = await fetch(`/${search}.json`);
  const pokemon = await pokemonRes.json();
  const pokemonSpeciesRes = await fetch("/pokemonSpeciesReturnedAPI.json");
  const pokemonSpecies = await pokemonSpeciesRes.json();

  const data = parsePokemon({ pokemon, pokemonSpecies });

  console.log("from getPokemon resulted value", data);
  //   return [pokemon, pokemonSpecies];
  return { ...data };
};
