export type Pokemon = {
  data: {
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
    sprites: {};
    stats: [];
    types: [
      {
        slot: 1;
        type: {
          name: "normal";
          url: "https://pokeapi.co/api/v2/type/1/";
        };
      }
    ];
    weight: 320;
  };
};

export type PokemonFlavor = {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};
