export type PokemonResponse = {
  abilities: [];
  base_experience: number;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: true;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: {};
  sprites: any;
  stats: [];
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
  weight: number;
};

export type PokemonSpeciesResponse = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  isFavourite: boolean;
  isRecent: boolean;
  pokemonData: { name: string; avatar: string; flavors: string };
};

export type User = {
  username: string;
  email: string;
  avatar?: string;
  favourites?: [];
};
