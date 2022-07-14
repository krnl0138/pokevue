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
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Pokemon, PokemonFlavor } from "../../utils/types";

import { openModal } from "../../lib/redux/slices/modalSlice";

type TPokemonCard = {
  data: [Pokemon, PokemonFlavor];
};

export const PokemonCard = ({ data }: TPokemonCard): JSX.Element => {
  const dispatch = useAppDispatch();
  const [pokemon, pokemonSpecies] = data;

  const removeCard = () => {
    dispatch(removeRecentCard(0));
  };

  const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
  const setOpenModal = () => {
    dispatch(openModal(data));
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

          <CardActionArea onClick={setOpenModal}>
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

          {isModalOpen ? null : (
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
