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

export const PokemonCardBody = () => {
  const { pokemonData } = useContext(PokemonCardContext);
  const { abilities, stats, description, avatarBig } = pokemonData;
  const randomColors = useMemo(() => getRandomColors(abilities), []);
  const descriptionShort = description.split(".").splice(0, 4).join(" ");

  return (
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Container sx={{ textAlign: "center", paddingBottom: 3 }}>
        <Image
          height="140"
          width="140"
          src={avatarBig ? avatarBig : placeholder}
          alt="pokemon avatar"
        />
      </Container>

      <Container>
        {description ? (
          <Typography
            variant="body2"
            paragraph={true}
            color="text.secondary"
            sx={{ textAlign: "justify" }}
          >
            {descriptionShort}
          </Typography>
        ) : (
          <p>No description were provided.</p>
        )}
      </Container>

      <Container>
        <List dense={true} sx={{ display: "flex", flexWrap: "wrap" }}>
          {abilities.map((ability, i) => (
            <ListItem
              key={ability.id}
              sx={{ width: "auto", padding: "0 8px 0 0" }}
            >
              <ListItemText sx={{ width: "auto", padding: "0 8px 0 0" }}>
                <Chip
                  label={ability.name}
                  size="small"
                  variant="outlined"
                  color={randomColors[i]}
                />
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Container>

      <Container>
        <List
          dense={true}
          disablePadding={true}
          sx={{ display: "flex", flexWrap: "wrap" }}
        >
          {stats.map((stat) => (
            <ListItem
              key={stat.id}
              sx={{ width: "auto", padding: "0 8px 0 0" }}
            >
              <ListItemText>
                <Chip
                  color="secondary"
                  label={stat.value}
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: "transparent",
                    color: "rgb(102 102 102)",
                    border: "none",
                    borderBottom: "1px solid rgb(159 159 159 / 71%)",
                    borderRadius: "16px",
                    padding: "0 0 0 5px",
                    height: "25px",
                  }}
                  icon={
                    stat.name === "hp" ? (
                      <Tooltip title="Health">
                        <FavoriteBorder />
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
