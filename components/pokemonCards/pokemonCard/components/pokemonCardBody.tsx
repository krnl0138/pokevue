import Image from "next/image";
import { AVATAR_PLACEHOLDER as placeholder } from "../../../../utils/constants";
import {
  CardContent,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DirectionsRun,
  FavoriteBorder,
  FitnessCenter,
  QuestionMark,
  Shield,
} from "@mui/icons-material";
import { useContext, useMemo } from "react";
import { getRandomColors } from "../../../../utils/functions";
import { PokemonCardContext } from "../pokemonCardContext";

const styleCardBody = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingBottom: 0,
};

const styleImageContainer = { textAlign: "center" };

const styleDescription = {
  textAlign: "justify",
  fontWeight: 300,
};

const styleList = { display: "flex", flexWrap: "wrap" };
const styleListItem = { width: "auto", padding: "0 8px 0 0" };

const styleListAbilitiesItemText = { width: "auto", padding: "0 8px 0 0" };
const styleStatsChip = {
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "1px solid rgb(159 159 159 / 71%)",
  borderRadius: "16px",
  padding: "0 0 0 5px",
  height: "25px",
  fontWeight: "300",
};

export const PokemonCardBody = () => {
  const { pokemonData } = useContext(PokemonCardContext);
  const { abilities, stats, description, avatarBig } = pokemonData;
  const randomColors = useMemo(() => getRandomColors(abilities), []);
  const descriptionShort = description.split(".").splice(0, 4).join(" ");

  console.log("avatarBig is:", avatarBig);
  return (
    <CardContent sx={styleCardBody}>
      <Container sx={styleImageContainer}>
        <Image
          height="140"
          width="140"
          // TODO there are some avatarBig instances that are valid urls but no files on them exist
          src={avatarBig ? avatarBig : placeholder}
          alt="pokemon avatar"
        />
      </Container>

      <Container>
        {description ? (
          <Typography variant="body2" paragraph={true} sx={styleDescription}>
            {descriptionShort}
          </Typography>
        ) : (
          <Typography variant="body2">No description were provided.</Typography>
        )}
      </Container>

      <Container>
        <List dense={true} sx={styleList}>
          {abilities.map((ability, i) => (
            <ListItem key={ability.id} sx={styleListItem}>
              <ListItemText sx={styleListAbilitiesItemText}>
                <Chip
                  label={ability.name}
                  size="small"
                  variant="outlined"
                  color={randomColors[i]}
                  sx={{ fontWeight: 300 }}
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>

      <Container>
        <List dense={true} disablePadding={true} sx={styleList}>
          {stats.map((stat) => (
            <ListItem key={stat.id} sx={styleListItem}>
              <ListItemText>
                <Chip
                  label={stat.value}
                  size="small"
                  variant="outlined"
                  sx={styleStatsChip}
                  icon={
                    stat.name === "hp" ? (
                      <Tooltip title="Health">
                        <FavoriteBorder fontSize="small" />
                      </Tooltip>
                    ) : stat.name === "speed" ? (
                      <Tooltip title="Speed">
                        <DirectionsRun />
                      </Tooltip>
                    ) : stat.name === "defense" ? (
                      <Tooltip title="Defense">
                        <Shield />
                      </Tooltip>
                    ) : stat.name === "attack" ? (
                      <Tooltip title="Attack">
                        <FitnessCenter />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unknown">
                        <QuestionMark />
                      </Tooltip>
                    )
                  }
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>
    </CardContent>
  );
};
