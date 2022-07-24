import { Container, Chip } from "@mui/material";
import { TPokemon } from "../../../utils/types";

type TPokemonAttributes = Pick<
  TPokemon["pokemonData"],
  "isLegendary" | "isMythical" | "isBaby"
>;

export const PokemonAttributes = ({
  isLegendary,
  isMythical,
  isBaby,
}: TPokemonAttributes) => {
  return (
    <Container
      sx={{
        display: "flex",
        paddingTop: 2,
        ">div": { marginRight: "5px" },
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
