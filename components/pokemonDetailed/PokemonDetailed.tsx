import { Container } from "@mui/material";
import { TPokemon } from "../../utils/types";
import { PokemonAbilities } from "./components/PokemonAbilities";
import { PokemonAttributes } from "./components/PokemonAttributes";
import { PokemonBigImage } from "./components/PokemonBigImage";
import { PokemonDescription } from "./components/PokemonDescription";
import { PokemonEvolution } from "./components/PokemonEvolution";
import { PokemonStats } from "./components/PokemonStats";
import { PokemonTitle } from "./components/PokemonTitle";

export const PokemonDetailed = ({
  id,
  pokemon,
  evolutionPokemons,
}: {
  id: number;
  pokemon: TPokemon;
  evolutionPokemons: TPokemon[];
}) => {
  const isFavourite = pokemon.isFavourite;
  const {
    name,
    avatarBig,
    description,
    abilities,
    stats,
    avatarSmall,
    captureRate,
    isBaby,
    isLegendary,
    isMythical,
  } = pokemon.pokemonData;

  return (
    <Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <PokemonTitle id={id} isFavourite={isFavourite} name={name} />
        <PokemonBigImage avatarBig={avatarBig} />
      </Container>

      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2.5,
        }}
      >
        <PokemonDescription description={description} />

        <Container sx={{ width: "60%", padding: 0, "@media": { padding: 0 } }}>
          <PokemonAbilities abilities={abilities} avatarSmall={avatarSmall} />
          <PokemonStats avatarSmall={avatarSmall} stats={stats} />
          <PokemonAttributes
            isBaby={isBaby}
            isLegendary={isLegendary}
            isMythical={isMythical}
          />
        </Container>
      </Container>

      {/* // TODO animate? */}
      <PokemonEvolution evolutionPokemons={evolutionPokemons} />
    </Container>
  );
};
