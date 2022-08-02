import { Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

export const PokemonDescription = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { description } = pokemonData;
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container>
      <Typography variant="h2" component="h2" sx={{ marginBottom: 3 }}>
        Description
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={
          smScreen
            ? {
                textAlign: "justify",
                paddingRight: 0,
              }
            : { textAlign: "justify", paddingRight: 6 }
        }
      >
        {description}
      </Typography>
    </Container>
  );
};
