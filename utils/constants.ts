import { TPokemon } from "./types";

export const POKEMON_API = "https://pokeapi.co/api/v2";

export const URLS = {
  home: "/",
  favourites: "/favourites",
  profile: "/profile",
  allPokemons: "/pokemons",
  about: "/about",
  login: "/login",
  register: "/register",
  // /pokemon/[id]
  pokemon: "/pokemon",
};

export const APP_NAME = "pokevue";
export const AVATAR_PLACEHOLDER = "/vercel.svg";
export const POKEMON_LOGO = "/pokemon_logo.webp";
export const PROJECT_LOGO = "/logo.png";
export const NUM_RANDOM_POKEMON_CADRS = 2;
export const NUM_RECENT_POKEMON_CARDS = 5;
export const NUM_COMMENTS_TO_SHOW = 5;

export const REGEX_EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const REGEX_PASSWORD = /\S{8,}/;

export const COLORS = [
  "primary",
  "secondary",
  "error",
  "info",
  "success",
  "warning",
] as const;

export const POKEMON_INITIAL_STATE: TPokemon = {
  id: -Infinity,
  isRecent: false,
  isRandom: false,
  isFavourite: false,
  comments: [],
  // commentsIds: [],
  ratingAverage: -Infinity,
  pokemonData: {
    name: "",
    avatarBig: "",
    avatarSmall: "",
    description: "",
    abilities: [{ id: -Infinity, name: "" }],
    stats: [{ id: -Infinity, name: "", value: -Infinity }],
    captureRate: -Infinity,
    isBaby: false,
    isLegendary: false,
    isMythical: false,
    evolutionName: "",
  },
};
