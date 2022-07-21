import Image from "next/image";
import { TPokemon } from "../../utils/types";
import { Heading } from "../utils/heading/Heading";

export const PokemonDetailed = ({ pokemon }: { pokemon: TPokemon }) => {
  // const isFavourite = pokemon.isFavourite;
  // const isRecent = pokemon.isRecent;
  // const isRandom = pokemon.isRandom;
  const {
    name,
    avatarBig,
    // description
  } = pokemon.pokemonData;

  return (
    <>
      <Heading title={name} />
      <Image src={avatarBig} alt={"Pokemon avatar"} width={150} height={150} />
    </>
  );
};
