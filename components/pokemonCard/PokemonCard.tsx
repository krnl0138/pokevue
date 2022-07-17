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
import React, { useMemo } from "react";
import { useAppDispatch } from "../../utils/hooks";

import { openModal } from "../../lib/redux/slices/modalSlice";
import {
  toggleRecentPokemon,
  toggleFavouritePokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useRouter } from "next/router";

import {
  PROJECT_URLS as urls,
  AVATAR_PLACEHOLDER as placeholder,
} from "../../utils/constants";
import { Pokemon } from "../../utils/types";
import {
  getCurrentUserId,
  removeFavourite,
  writeFavourite,
} from "../../database";

type TPokemonCard = {
  data?: Pokemon;
  fromRecent?: boolean;
  fromModal?: boolean;
};

// eslint-disable-next-line react/display-name
export const PokemonCard = React.forwardRef(
  ({ data, fromRecent, fromModal }: TPokemonCard): JSX.Element => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const currentUserId = useMemo(() => getCurrentUserId(), []);

    if (!data) return <p>Something is wrong there is no data available.</p>;
    const id = data.id;
    const isFavourite = data.isFavourite;
    const { name, avatar, flavors } = data.pokemonData;

    const handleRecent = () => {
      dispatch(toggleRecentPokemon(id));
    };

    const handleFavourite = () => {
      dispatch(toggleFavouritePokemon(id));
      if (currentUserId) {
        isFavourite
          ? // TODO on removing clear modalData slice; Modal stays open if no.
            removeFavourite(currentUserId, id)
          : writeFavourite(currentUserId, id);
      }
    };

    const handleOpenPokemonScreen = () => {
      router.push(`${urls.pokemon}/${id}`);
    };

    const handleOpenModal = () => {
      dispatch(openModal(data));
    };

    return (
      <article>
        <Card variant="outlined" sx={{ maxWidth: 345, m: 1 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
                <Image
                  src={avatar ? avatar : placeholder}
                  width="30"
                  height="30"
                  alt="avatar pokemon"
                />
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
            <Image
              height="140"
              width="140"
              src={avatar ? avatar : placeholder}
              alt="pokemon avatar"
            />
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

          {fromModal ? null : (
            <CardActions>
              {fromRecent ? (
                <Button onClick={handleRecent} size="small">
                  <Delete />
                </Button>
              ) : null}
              <Button onClick={handleFavourite} size="small">
                {isFavourite ? <Favorite /> : <FavoriteBorder />}
              </Button>
              <Button onClick={handleOpenPokemonScreen} size="small">
                <Output />
              </Button>
            </CardActions>
          )}
        </Card>
      </article>
    );
  }
);
