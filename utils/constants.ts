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
export const AVATAR_PLACEHOLDER = "/avatar_default.png";
export const POKEMON_LOGO = "/pokemon_logo.webp";
export const PROJECT_LOGO = "/logo.png";
export const BACKGROUND_IMAGE = "/pikachu_background.webp";
export const NUM_RANDOM_POKEMON_CADRS = 4;
export const NUM_POKEMONS_TO_LOAD_MORE = 4;
export const NUM_RECENT_POKEMON_CARDS = 5;
export const NUM_COMMENTS_TO_SHOW = 5;

export const HEADER_PAGES = ["Search", "About"];
export const HEADER_SETTINGS = ["Favourites", "Profile", "Logout"];

export const REGEX_EMAIL =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const REGEX_PASSWORD = /\S{7,}/;

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
  ratingAverage: -Infinity,
  comments: [],
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

export const IMAGE_FILE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export const IMAGE_FILE_SIZE_BYTES = 2100000;
