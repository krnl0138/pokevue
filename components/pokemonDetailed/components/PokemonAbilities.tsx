import { List, ListItem, ListItemText, Chip } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { TPokemon } from "../../../utils/types";

type TPokemonAbilities = Pick<
  TPokemon["pokemonData"],
  "abilities" | "avatarSmall"
>;
export const PokemonAbilities = ({
  abilities,
  avatarSmall,
}: TPokemonAbilities) => {
  return (
    <Container
      sx={{
        border: "1px solid rgb(0 0 0 / 10%)",
        borderRadius: "8px",
        paddingTop: 2,
        paddingBottom: 2,
        ":hover": {
          backgroundColor: "rgb(0 0 0 / 2%)",
          boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
        },
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
