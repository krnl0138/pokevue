import { Pokemon } from "../../utils/types";
import Image from "next/image";
import { Heading } from "../utils/heading/Heading";
import { useAppSelector } from "../../utils/hooks";

export const PokemonDetailed = ({ id: pokemonId }: { id: Pokemon }) => {
  const pokemon = useAppSelector((state) => state.pokemons.byId[pokemonId]);
  // TODO refactor this case
  if (!pokemon)
    return <p>Something is wrong there is no pokemon data available.</p>;

  const { id } = pokemon;
  const isFavourite = pokemon.isFavourite;
  const isRecent = pokemon.isRecent;
  const isRandom = pokemon.isRandom;
  const { name, avatar, flavors } = pokemon.pokemonData;

  return (
    <>
      <Heading title={name} />
      <Image src={avatar} alt={"Pokemon avatar"} width={150} height={150} />
    </>
  );
};
