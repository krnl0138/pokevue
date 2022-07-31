import { Container } from "@mui/material";
import { TPokemon } from "../../utils/types";
import { Comments } from "../comments/Comments";
import { CommentForm } from "../forms/commentForm/CommentForm";
import { PokemonRating } from "../pokemonRating/PokemonRating";
import { PokemonAbilities } from "./components/PokemonAbilities";
import { PokemonAttributes } from "./components/PokemonAttributes";
import { PokemonBigImage } from "./components/PokemonBigImage";
import { PokemonDescription } from "./components/PokemonDescription";
import { PokemonEvo } from "./components/PokemonEvo";
import { PokemonStats } from "./components/PokemonStats";
import { PokemonTitle } from "./components/PokemonTitle";
import { PokemonDetailedContext } from "./pokemonDetailedContext";

const styleContainerMain = {
  " h2": {
    fontSize: "3.2rem",
    letterSpacing: "0.03em",
  },
};

const styleContainerPokemonData = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 2.5,
};

const styleContainerImageTitle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 3,
};

const styleContainerPokemonAttributes = {
  width: "60%",
  padding: 0,
  "@media": { padding: 0 },
};

const styleContainerComments = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  maxWidth: "40rem",
  margin: 0,
};

type TPokemonDetailed = {
  id: number;
  pokemon: TPokemon;
  evolutionPokemons: TPokemon[];
};
export const PokemonDetailed = ({
  id,
  pokemon,
  evolutionPokemons,
}: TPokemonDetailed) => {
  return (
    <PokemonDetailedContext.Provider value={pokemon}>
      <Container sx={styleContainerMain}>
        <Container sx={styleContainerImageTitle}>
          <PokemonTitle />
          <PokemonBigImage />
        </Container>

        <Container sx={styleContainerPokemonData}>
          <PokemonDescription />

          <Container sx={styleContainerPokemonAttributes}>
            <PokemonRating id={id} inDetailed={true} />
            <PokemonAbilities />
            <PokemonStats />
            <PokemonAttributes />
          </Container>
        </Container>

        <Container sx={styleContainerComments}>
          <Comments pokemonId={id} />
          <CommentForm pokemonId={id} />
        </Container>
        {/* // TODO animate? */}
        <PokemonEvo evolutionPokemons={evolutionPokemons} />
      </Container>
    </PokemonDetailedContext.Provider>
  );
};
