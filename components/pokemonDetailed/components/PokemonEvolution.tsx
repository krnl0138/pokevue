import { ArrowRightAlt } from "@mui/icons-material";
import { Typography, Container, Box, Tooltip } from "@mui/material";
import Link from "next/link";
import { URLS } from "../../../utils/constants";
import { TPokemon } from "../../../utils/types";
import Image from "next/image";

type TPokemonEvolution = { evolutionPokemons: TPokemon[] };
export const PokemonEvolution = ({ evolutionPokemons }: TPokemonEvolution) => {
  return (
    <>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          paddingTop: 2,
          paddingLeft: 3,
          paddingBottom: 1,
          marginTop: 6,
          fontWeight: 700,
        }}
      >
        Evolution
      </Typography>

      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 4,
          paddingBottom: 6,
          "svg:last-child": { display: "none" },
        }}
      >
        {Object.values(evolutionPokemons).map((evo) => {
          const nameCapitalized =
            evo.pokemonData.name.charAt(0).toUpperCase() +
            evo.pokemonData.name.slice(1);
          return (
            <Box key={evo.id}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Tooltip title={`Show me ${nameCapitalized}!`}>
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Link href={`${URLS.pokemon}/${evo.pokemonData.name}`}>
                      <a>
                        <Image
                          src={evo.pokemonData.avatarBig}
                          alt={"Evolution pokemon avatar"}
                          width="150"
                          height="150"
                        />
                      </a>
                    </Link>
                    <Typography
                      component="p"
                      variant="body1"
                      sx={{ marginTop: 1.5 }}
                    >
                      <Link href={`${URLS.pokemon}/${evo.pokemonData.name}`}>
                        {nameCapitalized}
                      </Link>
                    </Typography>
                  </Box>
                </Tooltip>
              </Container>
              <ArrowRightAlt fontSize="large" />
            </Box>
          );
        })}
      </Container>
    </>
  );
};
