import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { ChangeEvent } from "react";
import { URL } from "url";
import { RootState } from "../lib/redux";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

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
  is_default: boolean;
  location_area_encounters: string;
  moves: Array<{
    move: {
      name: string;
      url: URL;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: URL;
      };
      version_group: {
        name: string;
        url: URL;
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
      url: URL;
    };
  }>;
  weight: number;
};

export type TPokemonSpeciesResponse = {
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  capture_rate: number;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: URL;
    };
    version: {
      name: string;
      url: URL;
    };
  }>;
  evolves_from_species: null | {
    name: string;
    url: URL;
  };
  evolution_chain: { url: URL };
};

export type TRatings = { [uid: TUser["uid"]]: number };
export type TComment = {
  uid: TUser["uid"];
  comment: string;
  commentId: string;
};

export type TPokemon = {
  id: number;
  isFavourite: boolean;
  isRecent: boolean;
  isRandom: boolean;
  ratingAverage?: number;
  comments: TComment[];
  pokemonData: {
    name: string;
    avatarBig: string;
    avatarSmall: string;
    description: string;
    abilities: Array<{ id: number; name: string }>;
    stats: Array<{ id: number; name: string; value: number }>;
    captureRate: number;
    isBaby: boolean;
    isLegendary: boolean;
    isMythical: boolean;
    evolutionName: null | string;
  };
};

export type TUser = {
  uid: string;
  username: string;
  email: string;
  avatar?: string;
  favourites: { [pokemonId: number]: number };
  ratings: { [pokemonId: number]: number };
};

export type TMyChangeFormEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type TChainResponse = {
  chain: {
    evolution_details: [];
    evolves_to: [
      {
        evolution_details: [];
        evolves_to: [
          {
            evolution_details: [];
            evolves_to: [];
            species: { name: string };
            is_baby: boolean;
          }
        ];
        is_baby: boolean;
        species: { name: string };
      }
    ];
    is_baby: boolean;
    species: { name: string };
  };
};

export type TCarouselItem = {
  name: string;
  description: string;
  image: string;
};