import { Container } from "@mui/material";
import { TPokemon } from "../../utils/types";
import { PokemonRating } from "../pokemonRating/PokemonRating";
import { PokemonAbilities } from "./components/PokemonAbilities";
import { PokemonAttributes } from "./components/PokemonAttributes";
import { PokemonBigImage } from "./components/PokemonBigImage";
import { PokemonDescription } from "./components/PokemonDescription";
import { PokemonEvolution } from "./components/PokemonEvolution";
import { PokemonStats } from "./components/PokemonStats";
import { PokemonTitle } from "./components/PokemonTitle";
import { PokemonDetailedContext } from "./pokemonDetailedContext";

const styleContainerImageTitle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 3,
};

const styleContainerMain = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 2.5,
};

const styleContainerPokemonData = {
  width: "60%",
  padding: 0,
  "@media": { padding: 0 },
};

export const PokemonDetailed = ({
  id,
  pokemon,
  evolutionPokemons,
}: {
  id: number;
  pokemon: TPokemon;
  evolutionPokemons: TPokemon[];
}) => {
  return (
    <PokemonDetailedContext.Provider value={pokemon}>
      <Container>
        <Container sx={styleContainerImageTitle}>
          <PokemonTitle />
          <PokemonBigImage />
        </Container>

        <Container sx={styleContainerMain}>
          <PokemonDescription />

          <Container sx={styleContainerPokemonData}>
            <PokemonRating id={id} inDetailed={true} />
            <PokemonAbilities />
            <PokemonStats />
            <PokemonAttributes />
          </Container>
        </Container>

        {/* // TODO animate? */}
        <PokemonEvolution evolutionPokemons={evolutionPokemons} />
      </Container>
    </PokemonDetailedContext.Provider>
  );
};
