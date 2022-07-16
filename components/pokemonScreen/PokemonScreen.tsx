import { Pokemon } from "../../utils/types";
import Image from "next/image";
import { Heading } from "../utils/heading/Heading";

export const PokemonScreen = ({ data }: { data: Pokemon }) => {
  //   const id = data.id;
  //   const isFavourite = data.isFavourite;
  //   const isRecent = data.isRecent;
  const { name, avatar } = data.pokemonData;
  return (
    <>
      <Heading title={name} />
      <Image src={avatar} alt={"Pokemon avatar"} width={150} height={150} />
    </>
  );
};
