import { Box } from "@mui/material";
import Link from "next/link";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../utils/heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { PROJECT_URLS as urls } from "../../utils/constants";

const NoFavourites = () => {
  return (
    <p>
      You have no favourite pokemons.{" "}
      <Link href={urls.main}>Find and add one!</Link>{" "}
    </p>
  );
};

export const FavouritePokemons = ({ children }: { children?: JSX.Element }) => {
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
