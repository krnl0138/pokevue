import { Url } from "url";

export type TPokemonResponse = {
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: true;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: Url;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: Url;
      };
      version_group: {
        name: string;
        url: Url;
      };
    }>;
  }>;
  name: string;
  order: number;
  past_types: [];
  species: {};
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      home: {
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shiny_female: null;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: Url;
    };
  }>;
  weight: number;
};

export type TPokemonSpeciesResponse = {
  is_baby: false;
  is_legendary: false;
  is_mythical: false;
  capture_rate: number;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: Url;
    };
    version: {
      name: string;
      url: Url;
    };
  }>;
  evolves_from_species: null | {
    name: string;
    url: Url;
  };
};

export type TRatings = { [uuid: string]: number };

export type TPokemon = {
  id: number;
  isFavourite: boolean;
  isRecent: boolean;
  isRandom: boolean;
  // TODO check optional value => mandatory
  ratingAverage?: null | number;
  pokemonData: {
    name: string;
    avatarBig: string;
    avatarSmall: string;
    description: string;
    abilities: Array<{ id: number; name: string }>;
    stats: Array<{ id: number; name: string; value: number }>;
    captureRate: number;
    isBaby: false;
    isLegendary: false;
    isMythical: false;
    evolutionName: null | string;
  };
};

export type TUser = {
  username: string;
  email: string;
  avatar?: string;
  favourites: { [pokemonId: number]: number };
  ratings: { [pokemonId: number]: number };
};
