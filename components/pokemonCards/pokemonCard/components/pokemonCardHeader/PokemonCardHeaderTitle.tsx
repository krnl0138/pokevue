import {
  BedroomBabyOutlined,
  Stars,
  QuestionMarkOutlined,
} from "@mui/icons-material";
import { Container, Typography, Tooltip, Chip } from "@mui/material";
import { useContext } from "react";
import { getCaptureColor } from "../../../../../utils/functions";
import { PokemonRating } from "../../../../pokemonRating/PokemonRating";
import { PokemonCardContext } from "../../pokemonCardContext";

const styleMainContainer = {
  padding: 0,
  display: "flex",
  alignItems: "center",
  "@media": { padding: 0 },
};

const styleHeading = {
  textTransform: "capitalize",
  paddingRight: "5px",
  fontWeight: "300",
};

const styleAttributes = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: 0,
  width: "auto",
  "@media": { padding: 0 },
};

const styleCaptureColorChip = {
  height: "8px",
  width: "8px",
  marginLeft: "4px",
};

export const PokemonCardHeaderTitle = () => {
  const { id, pokemonData } = useContext(PokemonCardContext);
  const { isBaby, isLegendary, isMythical, name, captureRate } = pokemonData;

  const captureColor = getCaptureColor(captureRate);
  return (
    <Container sx={styleMainContainer}>
      <Typography variant="h6" sx={styleHeading}>
        {name}
      </Typography>

      <PokemonRating id={id} />

      <Container sx={styleAttributes}>
        {isBaby && (
          <Tooltip title="Pokemon is baby">
            <BedroomBabyOutlined fontSize="small" color="primary" />
          </Tooltip>
        )}
        {isLegendary && (
          <Tooltip title="Pokemon is legendary">
            <Stars fontSize="small" color="primary" />
          </Tooltip>
        )}
        {isMythical && (
          <Tooltip title="Pokemon is mythical">
            <QuestionMarkOutlined fontSize="small" color="primary" />
          </Tooltip>
        )}
        {captureColor === "default" ? null : (
          <Tooltip
            title={
              captureColor === "error"
                ? "Incredibly hard to catch"
                : captureColor === "warning"
                ? "Can be tricky to catch"
                : "Very easy to catch"
            }
          >
            <Chip color={captureColor} sx={styleCaptureColorChip}></Chip>
          </Tooltip>
        )}
      </Container>
    </Container>
  );
};
