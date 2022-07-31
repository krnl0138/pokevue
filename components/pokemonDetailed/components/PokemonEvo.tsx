import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { capitalize } from "../../../utils/functions";
import { TPokemon } from "../../../utils/types";
import { PokemonDetailedContext } from "../pokemonDetailedContext";
import { PokemonEvoItem } from "./PokemonEvoItem";

const styleEvolutionTitle = {
  paddingTop: 2,
  paddingLeft: 3,
  paddingBottom: 1,
  marginTop: 6,
  fontWeight: 700,
};
const styleEvolutionContainerMain = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  padding: 4,
  paddingBottom: 6,
};

export const PokemonEvo = ({
  evolutionPokemons,
}: {
  evolutionPokemons: TPokemon[];
}) => {
  const { id, pokemonData } = useContext(PokemonDetailedContext);
  const { name, avatarBig: avatarBigFirst } = pokemonData;
  const nameFirst = capitalize(name);
  const evolution = Object.values(evolutionPokemons);
  return (
    <Box component="div">
      <Typography component="h2" variant="h4" sx={styleEvolutionTitle}>
        Evolution
      </Typography>

      <Container sx={styleEvolutionContainerMain}>
        <PokemonEvoItem id={id} avatarBig={avatarBigFirst} name={nameFirst} />
        <ArrowRightAlt fontSize="large" />
        {evolution.map((evo, i) => {
          const name = capitalize(evo.pokemonData.name);
          const avatarBig = evo.pokemonData.avatarBig;
          return (
            <>
              <PokemonEvoItem
                key={evo.id}
                id={evo.id}
                avatarBig={avatarBig}
                name={name}
              />
              {i === evolution.length - 1 ? null : (
                <ArrowRightAlt key={i} fontSize="large" />
              )}
            </>
          );
        })}
      </Container>
    </Box>
  );
};
