import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { blue } from "@mui/material/colors";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import { removeRecentCard } from "../../lib/redux/slices/recentSearchSlice";
import { useAppDispatch } from "../../utils/hooks";
import { Pokemon, PokemonFlavor } from "../../utils/types";

type TPokemonCard = {
  data: [Pokemon, PokemonFlavor];
  openModal?: () => void;
};

export const PokemonCard = ({ data, openModal }: TPokemonCard): JSX.Element => {
  const dispatch = useAppDispatch();
  const [pokemon, pokemonSpecies] = data;

  const removeCard = () => {
    dispatch(removeRecentCard(0));
  };

  const name = pokemon.name;
  const avatar = pokemon.sprites?.other["official-artwork"].front_default;
  const flavors = pokemonSpecies.flavor_text_entries
    .slice(1, 3)
    .map((flavor) => `${flavor.flavor_text}\n`);

  return (
    <>
      <article>
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
                {avatar ? (
                  <Image
                    src={avatar}
                    width="30"
                    height="30"
                    alt="avatar pokemon"
                  />
                ) : null}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVert />
              </IconButton>
            }
            title={name}
            // subheader="September 14, 2016"
          />

          <CardActionArea onClick={openModal}>
            {/* Change to placeholder image from /public */}
            {avatar ? (
              <Image
                // <CardMedia
                //   component="img"
                height="140"
                width="140"
                src={avatar}
                alt="pokemon avatar"
              />
            ) : null}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              {pokemonSpecies ? (
                <Typography variant="body2" color="text.secondary">
                  {flavors}
                </Typography>
              ) : null}
            </CardContent>
          </CardActionArea>

          {openModal ? null : (
            <CardActions>
              <Button onClick={removeCard} size="small">
                Remove
              </Button>
            </CardActions>
          )}
        </Card>
      </article>
    </>
  );
};
