import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { POKEMON_LOGO } from "../../utils/constants";
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
  "::before": {
    content: "''",
    position: "absolute",
    width: "32rem",
    height: "20rem",
    zIndex: -1,
    top: "5%",
    right: "12%",
    backgroundImage: `url(${POKEMON_LOGO})`,
    backgroundSize: "32rem 10rem",
    backgroundRepeat: "no-repeat",
    filter: "opacity(.1)",
    transform: "rotate(15deg)",
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
  const theme = useTheme();
  const styleMain =
    theme.palette.mode === "light"
      ? {
          ...styleContainerMain,
          "::before": {
            ...styleContainerMain["::before"],
            filter: "opacity(.3)",
          },
        }
      : styleContainerMain;

  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const stylePokemonData = smallScreen
    ? { ...styleContainerPokemonData, flexDirection: "column" }
    : styleContainerPokemonData;
  const stylePokemonAttributes = smallScreen
    ? { ...styleContainerPokemonAttributes, width: "100%", marginTop: "2rem" }
    : styleContainerPokemonAttributes;
  return (
    <PokemonDetailedContext.Provider value={pokemon}>
      <Container sx={styleMain}>
        <Container sx={styleContainerImageTitle}>
          <PokemonTitle />
          <PokemonBigImage />
        </Container>

        <Container sx={stylePokemonData}>
          <PokemonDescription />

          <Container sx={stylePokemonAttributes}>
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
