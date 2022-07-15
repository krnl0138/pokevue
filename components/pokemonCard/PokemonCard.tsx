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
import {
  Delete,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Output,
} from "@mui/icons-material";
import React, { useState } from "react";
import { removeRecentCard } from "../../lib/redux/slices/recentSearchSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// import { Pokemon, PokemonFlavor } from "../../utils/types";

import { openModal } from "../../lib/redux/slices/modalSlice";
import { addFavouritePokemon } from "../../lib/redux/slices/favouritePokemonSlice";
import {
  toggleRecentPokemon,
  toggleFavouritePokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useRouter } from "next/router";

type TPokemonCard = {
  data: {
    id: number;
    pokemonData: { name: string; avatar: string; flavors: string };
    isFavourite: boolean;
    isRecent: boolean;
  };
};

// eslint-disable-next-line react/display-name
export const PokemonCard = React.forwardRef(
  ({ data }: TPokemonCard): JSX.Element => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const id = data.id;
    const isFavourite = data.isFavourite;
    const isRecent = data.isRecent;
    const { name, avatar, flavors } = data.pokemonData;

    const handleRecent = () => {
      dispatch(removeRecentCard(id));
      dispatch(toggleRecentPokemon(id));
    };

    const handleFavourite = () => {
      dispatch(addFavouritePokemon(data));
      dispatch(toggleFavouritePokemon(id));
    };

    const handleOpenPokemonScreen = () => {
      router.push(`/pokemon/${id}`);
    };

    // state for modal view of card
    const isModalOpen = useAppSelector((state) => state.modal.modalOpen);
    const handleOpenModal = () => {
      dispatch(openModal(data));
    };

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

            <CardActionArea onClick={handleOpenModal}>
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
                {flavors ? (
                  <Typography variant="body2" color="text.secondary">
                    {flavors}
                  </Typography>
                ) : null}
              </CardContent>
            </CardActionArea>

            {isModalOpen ? null : (
              <CardActions>
                <Button onClick={handleRecent} size="small">
                  <Delete />
                </Button>
                <Button onClick={handleFavourite} size="small">
                  {isFavourite ? <Favorite /> : <FavoriteBorder />}
                  {/* <FavoriteBorder /> */}
                </Button>
                <Button onClick={handleOpenPokemonScreen} size="small">
                  <Output />
                </Button>
              </CardActions>
            )}
          </Card>
        </article>
      </>
    );
  }
);
