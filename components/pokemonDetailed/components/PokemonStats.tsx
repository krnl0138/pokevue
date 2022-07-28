import {
  FavoriteBorder,
  DirectionsRun,
  Shield,
  FitnessCenter,
  QuestionMark,
} from "@mui/icons-material";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";
import { PokemonAttributesContainer } from "./PokemonAttributesContainer";

const styleStatListItem = {
  display: "flex",
  alignContent: "center",
  svg: { marginRight: 0.5 },
};

const styleStatsList = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  paddingBottom: 2,
};

export const PokemonStats = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { stats, avatarSmall } = pokemonData;
  return (
    <PokemonAttributesContainer title="Stats" avatar={avatarSmall}>
      <List dense={true} disablePadding={true} sx={styleStatsList}>
        {stats.map((stat) => (
          <ListItem key={stat.id} sx={{ width: "auto", padding: "0 8px 0 0" }}>
            <ListItemText>
              {stat.name === "hp" ? (
                <Typography variant="body2" sx={styleStatListItem}>
                  <FavoriteBorder />
                  Health: {stat.value}
                </Typography>
              ) : stat.name === "speed" ? (
                <Typography variant="body2" sx={styleStatListItem}>
                  <DirectionsRun />
                  Speed: {stat.value}
                </Typography>
              ) : stat.name === "defense" ? (
                <Typography variant="body2" sx={styleStatListItem}>
                  <Shield />
                  Defense: {stat.value}
                </Typography>
              ) : stat.name === "attack" ? (
                <Typography variant="body2" sx={styleStatListItem}>
                  <FitnessCenter />
                  Attack: {stat.value}
                </Typography>
              ) : (
                <QuestionMark />
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </PokemonAttributesContainer>
  );
};
