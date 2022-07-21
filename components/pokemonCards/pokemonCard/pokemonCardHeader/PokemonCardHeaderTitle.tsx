import {
  Grade,
  BedroomBabyOutlined,
  Stars,
  QuestionMarkOutlined,
} from "@mui/icons-material";
import { Container, Typography, Tooltip, Box } from "@mui/material";
import { getStars } from "../../../../utils/functions";
import { TMyCardHeader } from "./PokemonCardHeader";

type TMyCardHeaderTitle = Pick<
  TMyCardHeader,
  "isBaby" | "isLegendary" | "isMythical" | "name" | "captureRate"
>;

export const PokemonCardHeaderTitle = ({
  isBaby,
  isLegendary,
  isMythical,
  name,
  captureRate,
}: TMyCardHeaderTitle) => {
  const stars = getStars(captureRate);
  const starsArray = [...Array(stars).keys()];
  return (
    <Container sx={{ padding: 0, display: "flex", alignItems: "center" }}>
      <Typography
        variant="h6"
        sx={{ textTransform: "capitalize", paddingRight: "5px" }}
      >
        {name}
      </Typography>

      <Tooltip title="Rate of capture">
        <Box sx={{ alignSelf: "flex-end" }}>
          {starsArray.map((i) => (
            <Grade key={i} fontSize="small" />
          ))}
        </Box>
      </Tooltip>

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
    </Container>
  );
};
