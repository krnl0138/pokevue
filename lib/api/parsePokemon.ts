import {
  TPokemon,
  TPokemonResponse,
  TPokemonSpeciesResponse,
} from "../../utils/types";

export const parsePokemon = (data: {
  pokemon: TPokemonResponse;
  pokemonSpecies: TPokemonSpeciesResponse;
}): Omit<TPokemon, "isFavourite" | "isRecent" | "isRandom"> => {
  const { pokemon, pokemonSpecies } = data;
  const id = pokemon.id;
  const name = pokemon.name;
  const avatarBig = pokemon.sprites?.other["official-artwork"].front_default;
  const avatarSmall = pokemon.sprites?.front_default;
  const isLegendary = pokemonSpecies.is_legendary;
  const isMythical = pokemonSpecies.is_mythical;
  const isBaby = pokemonSpecies.is_baby;
  const captureRate = pokemonSpecies.capture_rate;
  const description = pokemonSpecies.flavor_text_entries
    .filter((flavor) => flavor.language.name === "en")
    .slice(0, 3)
    .flatMap((flavor) => flavor.flavor_text)
    .join(" ");

  // stats = { 1: { name: "hp", value: 45 }, }
  const stats: TPokemon["pokemonData"]["stats"] = pokemon.stats
    .filter((stat) => !stat.stat.name.includes("special"))
    .map((stat) => {
      const splits = stat.stat.url.toString().split("/");
      const id = Number(splits[splits.length - 2]);
      const name = stat.stat.name;
      const value = stat.base_stat;
      return { id, name, value };
    });

  // abilities = { 65: "overgrow", }
  const abilities: TPokemon["pokemonData"]["abilities"] = pokemon.abilities.map(
    (ability) => {
      const splits = ability.ability.url.split("/");
      const id = Number(splits[splits.length - 2]);
      const name = ability.ability.name;
      return { id: id, name };
    }
  );

  return {
    id,
    pokemonData: {
      name,
      avatarBig,
      avatarSmall,
      description,
      stats,
      abilities,
      captureRate,
      isBaby,
      isLegendary,
      isMythical,
    },
  };
};
