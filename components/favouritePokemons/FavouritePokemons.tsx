import { Box } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../utils/heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { NoFavourites } from "./NoFavourites";

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
