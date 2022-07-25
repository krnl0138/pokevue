import { List, ListItem, ListItemText, Chip } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useContext } from "react";
import { styleHoverShadow } from "../../../styles/styles";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

export const PokemonAbilities = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { abilities, avatarSmall } = pokemonData;
  return (
    <Container
      sx={{
        border: "1px solid rgb(0 0 0 / 10%)",
        borderRadius: "8px",
        paddingTop: 2,
        paddingBottom: 2,
        ...styleHoverShadow,
      }}
    >
      <Container
        sx={{
          padding: 0,
          "@media": { padding: 0 },
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            marginRight: "5px",
          }}
        >
          Ablities
        </Typography>
        <Image
          src={avatarSmall}
          alt={"Pokemon small avatar"}
          width={65}
          height={65}
        />
      </Container>
      <Container>
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
      </Container>
    </Container>
  );
};
