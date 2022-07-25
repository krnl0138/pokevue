import {
  FavoriteBorder,
  DirectionsRun,
  Shield,
  FitnessCenter,
  QuestionMark,
} from "@mui/icons-material";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { styleHoverShadow } from "../../../styles/styles";
import { useContext } from "react";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

const statStyle = {
  display: "flex",
  alignContent: "center",
  svg: { marginRight: 0.5 },
};

export const PokemonStats = () => {
  const { pokemonData } = useContext(PokemonDetailedContext);
  const { stats, avatarSmall } = pokemonData;
  return (
    <Container
      sx={{
        border: "1px solid rgb(0 0 0 / 10%)",
        borderRadius: "8px",
        paddingTop: 2,
        marginTop: 2,
        paddingBottom: 5,
        ...styleHoverShadow,
      }}
    >
      <Container
        sx={{
          padding: 0,
          "@media": { padding: 0 },
          display: "flex",
          justifyContent: "flex-start",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          Stats
        </Typography>
        <Image
          src={avatarSmall}
          alt={"Pokemon small avatar"}
          width={65}
          height={65}
        />
      </Container>

      <Container sx={{ padding: 0, "@media": { padding: 0 } }}>
        <List
          dense={true}
          disablePadding={true}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {stats.map((stat) => (
            <ListItem
              key={stat.id}
              sx={{ width: "auto", padding: "0 8px 0 0" }}
            >
              <ListItemText>
                {stat.name === "hp" ? (
                  <Typography variant="body2" sx={statStyle}>
                    <FavoriteBorder />
                    Health: {stat.value}
                  </Typography>
                ) : stat.name === "speed" ? (
                  <Typography variant="body2" sx={statStyle}>
                    <DirectionsRun />
                    Speed: {stat.value}
                  </Typography>
                ) : stat.name === "defense" ? (
                  <Typography variant="body2" sx={statStyle}>
                    <Shield />
                    Defense: {stat.value}
                  </Typography>
                ) : stat.name === "attack" ? (
                  <Typography variant="body2" sx={statStyle}>
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
      </Container>
    </Container>
  );
};
