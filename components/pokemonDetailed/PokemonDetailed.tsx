import {
  FavoriteBorder,
  DirectionsRun,
  Shield,
  FitnessCenter,
  QuestionMark,
  Favorite,
  FavoriteOutlined,
  ArrowRightAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {
  addFavouritePokemon,
  removeFavouritePokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { URLS } from "../../utils/constants";
import { useAppDispatch } from "../../utils/hooks";
import { TPokemon } from "../../utils/types";

const statStyle = {
  display: "flex",
  alignContent: "center",
  svg: { marginRight: 0.5 },
};

export const PokemonDetailed = ({
  id,
  pokemon,
  evolutionPokemons,
}: {
  id: number;
  pokemon: TPokemon;
  evolutionPokemons: TPokemon[];
}) => {
  const dispatch = useAppDispatch();
  const isFavourite = pokemon.isFavourite;
  const {
    name,
    avatarBig,
    description,
    abilities,
    stats,
    avatarSmall,
    captureRate,
    isBaby,
    isLegendary,
    isMythical,
  } = pokemon.pokemonData;

  const handleFavourite = () => {
    if (isFavourite) {
      // dbRemoveFavourite(id);
      dispatch(removeFavouritePokemon(id));
      return;
    }
    // dbWriteFavourite(id);
    dispatch(addFavouritePokemon(id));
  };

  return (
    <Container>
      {/* TOP */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          fontWeight="700"
          sx={{ textTransform: "capitalize", padding: 3 }}
        >
          {name}
          <Button
            onClick={handleFavourite}
            sx={{ marginLeft: 2, borderRadius: "12px" }}
          >
            {isFavourite ? (
              <Favorite fontSize="large" color="primary" />
            ) : (
              <FavoriteBorder fontSize="large" color="primary" />
            )}
          </Button>
        </Typography>

        {/* pokemon big image */}
        <Container
          sx={{
            borderRadius: "50%",
            textAlign: "center",
            margin: 0,
            padding: 0,
            width: "auto",
          }}
        >
          <Image
            src={avatarBig}
            alt={"Pokemon avatar"}
            width={250}
            height={250}
          />
        </Container>
      </Container>
      {/* BOTTOM */}
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2.5,
        }}
      >
        {/* LEFT SIDE BOTTOM */}
        <Container sx={{}}>
          <Typography variant="h2" component="h2" sx={{ marginBottom: 3 }}>
            Description
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: "justify", paddingRight: 6 }}
          >
            {description}
          </Typography>
        </Container>

        {/* RIGHT SIDE BOTTOM */}
        <Container sx={{ width: "60%", padding: 0, "@media": { padding: 0 } }}>
          {/* abilities */}
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

          {/* stats */}
          <Container
            sx={{
              border: "1px solid rgb(0 0 0 / 10%)",
              borderRadius: "8px",
              paddingTop: 2,
              marginTop: 2,
              paddingBottom: 5,
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
          <Container
            sx={{
              display: "flex",
              paddingTop: 2,
              ">div": { marginRight: "5px" },
            }}
          >
            <Chip
              variant="outlined"
              color={isLegendary ? "success" : "primary"}
              label={isLegendary ? "Legendary" : "Not legendary"}
            ></Chip>
            <Chip
              variant="outlined"
              color={isMythical ? "success" : "primary"}
              label={isMythical ? "Mythical" : "Not mythical"}
            ></Chip>
            <Chip
              variant="outlined"
              color={isBaby ? "warning" : "primary"}
              label={isBaby ? "Baby" : "Not baby"}
            ></Chip>
          </Container>
        </Container>
      </Container>

      {/* // TODO animate? */}
      {/* Evolution */}
      <Typography
        component="h2"
        variant="h4"
        sx={{
          paddingTop: 2,
          paddingLeft: 3,
          paddingBottom: 1,
          marginTop: 6,
          fontWeight: 700,
        }}
      >
        Evolution
      </Typography>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 4,
          paddingBottom: 6,
          "svg:last-child": { display: "none" },
        }}
      >
        {Object.values(evolutionPokemons).map((evo) => {
          const nameCapitalized =
            evo.pokemonData.name.charAt(0).toUpperCase() +
            evo.pokemonData.name.slice(1);
          return (
            <Box key={evo.id}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Tooltip title={`Show me ${nameCapitalized}!`}>
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Link href={`${URLS.pokemon}/${evo.pokemonData.name}`}>
                      <a>
                        <Image
                          src={evo.pokemonData.avatarBig}
                          alt={"Evolution pokemon avatar"}
                          width="150"
                          height="150"
                        />
                      </a>
                    </Link>
                    <Typography
                      component="p"
                      variant="body1"
                      sx={{ marginTop: 1.5 }}
                    >
                      <Link href={`${URLS.pokemon}/${evo.pokemonData.name}`}>
                        {nameCapitalized}
                      </Link>
                    </Typography>
                  </Box>
                </Tooltip>
              </Container>
              <ArrowRightAlt fontSize="large" />
            </Box>
          );
        })}
      </Container>
    </Container>
  );
};
