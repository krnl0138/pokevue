import { Container, Typography } from "@mui/material";
import { TPokemon } from "../../../utils/types";

type TPokemonDescription = Pick<TPokemon["pokemonData"], "description">;
export const PokemonDescription = ({ description }: TPokemonDescription) => {
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
