import { Container, Typography } from "@mui/material";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

export const PokemonDescription = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { description } = pokemonData;
  return (
    <Container sx={{}}>
      <Typography variant="h2" component="h2" sx={{ marginBottom: 3 }}>
        Description
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ textAlign: "justify", paddingRight: 6 }}
      >
        {description}
      </Typography>
    </Container>
  );
};
