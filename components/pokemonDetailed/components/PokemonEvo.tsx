import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Container, Tooltip, Typography } from "@mui/material";
import React from "react";
import { capitalize } from "../../../utils/functions";
import { TPokemon } from "../../../utils/types";
import { PokemonEvoItem } from "./PokemonEvoItem";

const styleEvolutionTitle = {
  display: "inline-block",
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
  let evolution;
  if (Object.values(evolutionPokemons).length === 1) {
    console.log("evolutionPokemons are an array");
    evolution = Object.values(evolutionPokemons);
  } else {
    evolution = [evolutionPokemons];
  }
  console.log(
    "evolutionPokemons length changing are: ",
    Object.values(evolutionPokemons).length
  );
  console.log("evolutionPokemons before changing are: ", evolutionPokemons);
  // console.log("evolutionPokemons after changing are: ", evolution);
  return (
    <Box component="div">
      <Tooltip title="Shows you an evolution chain">
        <Typography component="h2" variant="h4" sx={styleEvolutionTitle}>
          Evolution
        </Typography>
      </Tooltip>

      <Container sx={styleEvolutionContainerMain}>
        {Object.values(evolutionPokemons).map((evo, i) => {
          const name = capitalize(evo.pokemonData.name);
          const avatarBig = evo.pokemonData.avatarBig;
          return (
            <React.Fragment
              key={evo.id}
              // component="div"
              // sx={{ display: "flex", alignItems: "center" }}
            >
              {i === evolution.length - 1 ? null : (
                <ArrowRightAlt fontSize="large" />
              )}
              <PokemonEvoItem id={evo.id} avatarBig={avatarBig} name={name} />
            </React.Fragment>
          );
        })}
      </Container>
    </Box>
  );
};
