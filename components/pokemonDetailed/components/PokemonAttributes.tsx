import { Container, Chip, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

export const PokemonAttributes = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { isLegendary, isMythical, isBaby } = pokemonData;
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const styleWidth = mdScreen ? { justifyContent: "center" } : "";
  return (
    <Container
      sx={{
        display: "flex",
        paddingTop: 2,
        ">div": { marginRight: "1rem" },
        ...styleWidth,
      }}
    >
      <Chip
        variant="outlined"
        color={isLegendary ? "success" : "primary"}
        label={isLegendary ? "Legendary" : "Not legendary"}
      ></Chip>
      <Chip
        variant="outlined"
        color={isMythical ? "success" : "primary"}
        label={isMythical ? "Mythical" : "Not mythical"}
      ></Chip>
      <Chip
        variant="outlined"
        color={isBaby ? "warning" : "primary"}
        label={isBaby ? "Baby" : "Not baby"}
      ></Chip>
    </Container>
  );
};
