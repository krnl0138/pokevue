import {
  TPokemon,
  TPokemonResponse,
  TPokemonSpeciesResponse,
} from "../../utils/types";

export const parsePokemon = (data: {
  pokemon: TPokemonResponse;
  pokemonSpecies: TPokemonSpeciesResponse;
}): Pick<TPokemon, "pokemonData" | "id"> => {
  console.log("parsePokemon was CALLED!!!");
  const { pokemon, pokemonSpecies } = data;
  const id = pokemon.id;
  const name = pokemon.name;
  const avatarBig = pokemon.sprites?.other["official-artwork"].front_default;
  const avatarSmall = pokemon.sprites?.front_default;
  const isLegendary = pokemonSpecies.is_legendary;
  const isMythical = pokemonSpecies.is_mythical;
  const isBaby = pokemonSpecies.is_baby;
  const captureRate = pokemonSpecies.capture_rate;
  const evolutionName = pokemonSpecies.evolves_from_species?.name ?? null;

  /* Extract an array of 10 english phrases for description */
  const descriptionBase = pokemonSpecies.flavor_text_entries
    .filter((flavor) => flavor.language.name === "en")
    .slice(0, 10)
    .map((flavor) => flavor.flavor_text);

  /* Delete duplicates with Set and do naming */
  const description = [...new Set(descriptionBase)]
    .join(" ")
    .replaceAll("POKéMON", "pokemon")
    .replaceAll(
      name.toUpperCase(),
      name.charAt(0).toUpperCase() + name.slice(1)
    );

  /* stats structure is: { 1: { name: "hp", value: 45 }, } */
  const stats: TPokemon["pokemonData"]["stats"] = pokemon.stats
    .filter((stat) => !stat.stat.name.includes("special"))
    .map((stat) => {
      const splits = stat.stat.url.toString().split("/");
      const id = Number(splits[splits.length - 2]);
      const name = stat.stat.name;
      const value = stat.base_stat;
      return { id, name, value };
    });

  /* abilities structure is: { 65: "overgrow", } */
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
      evolutionName,
    },
  };
};
