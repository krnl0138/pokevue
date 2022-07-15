import { Box } from "@mui/material";
import { Heading } from "../heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";

export const AllPokemons = ({ children }: { children?: JSX.Element }) => {
  return (
    <>
      <Heading title={"Your favourite pokemons"} />
      <Box>
        <p>Hello world</p>
      </Box>
    </>
  );
};
