import { List, ListItem, ListItemText, Chip } from "@mui/material";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";
import { PokemonAttributesContainer } from "./PokemonAttributesContainer";

export const PokemonAbilities = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { abilities, avatarSmall } = pokemonData;
  return (
    <PokemonAttributesContainer title="Abilities" avatar={avatarSmall}>
      <List dense={true} sx={{ display: "flex", flexWrap: "wrap" }}>
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
