// import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
// import { pokemonAPI } from "../utils/constants";
// import { Pokemon } from "../utils/types";
import * as pokemonReturnedAPI from "../utils/pokemonReturnedAPI.json";
import React from "react";

// export const getStaticProps: GetStaticProps = async () => {
//   const res = await fetch(`${pokemonAPI}/pokemon/53/`);
//   const data: Pokemon = await res.json();

//   return { props: { data } };
// };

// const PokemonCard = ({
//   data,
// }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
//   return <div>{data.name}</div>;
// };

const SearchBar = (): JSX.Element => {
  return (
    <div>
      <input type="text" />
      <button>Search</button>
    </div>
  );
};

export const PokemonCard = (): JSX.Element => {
  return (
    <>
      <h1>{pokemonReturnedAPI.name}</h1>
      <p>{pokemonReturnedAPI.weight}</p>
      <Image
        width="200"
        height="200"
        src={pokemonReturnedAPI.sprites.other["official-artwork"].front_default}
        alt="Pokemon avatar"
      ></Image>
      <SearchBar />
    </>
  );
};

export default PokemonCard;
