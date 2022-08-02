import {
  List,
  ListItem,
  ListItemText,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";
import { PokemonAttributesContainer } from "./PokemonAttributesContainer";

export const PokemonAbilities = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { abilities, avatarSmall } = pokemonData;

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const styleSmall = smScreen ? { justifyContent: "space-around" } : "";
  return (
    <PokemonAttributesContainer title="Abilities" avatar={avatarSmall}>
      <List
        dense={true}
        sx={{ display: "flex", flexWrap: "wrap", ...styleSmall }}
      >
        {abilities.map((ability, i) => (
          <ListItem
            key={ability.id}
            sx={{ width: "auto", padding: "0 16px 0 0" }}
          >
            <ListItemText>
              <Chip
                label={ability.name}
                variant="outlined"
                color="primary"
                sx={{ fontSize: 14 }}
              />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </PokemonAttributesContainer>
  );
};
