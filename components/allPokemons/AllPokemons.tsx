import { Box } from "@mui/material";
import { Heading } from "../utils/heading/Heading";

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
