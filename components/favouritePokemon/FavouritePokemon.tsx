import { Box } from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";

const NoFavourites = () => {
  return (
    <p>
      You have no favourite pokemons.{" "}
      <Link href={"/pokemon"}>Find and add one!</Link>{" "}
    </p>
  );
};

export const FavouritePokemon = ({ children }: { children?: JSX.Element }) => {
  const favouritePokemons = useAppSelector((state) => state.pokemons).filter(
    (pokemon) => pokemon.isFavourite === true
  );

  return (
    <>
      <Heading title={"Your favourite pokemons"} />
      <Box>
        {favouritePokemons.length > 0 ? (
          favouritePokemons.map((data) => (
            <PokemonCard key={data.id} data={data} />
          ))
        ) : (
          <NoFavourites />
        )}
      </Box>
    </>
  );
};
