import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { blue } from "@mui/material/colors";
import { MyCardActions } from "./MyCardActions";
import {
  Delete,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Search,
} from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

import { closeModal, openModal } from "../../lib/redux/slices/modalSlice";
import {
  addRecentPokemon,
  removeFavouritePokemon,
  addFavouritePokemon,
  removeRecentPokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useRouter } from "next/router";

import {
  PROJECT_URLS as urls,
  AVATAR_PLACEHOLDER as placeholder,
} from "../../utils/constants";
import { dbRemoveFavourite, dbWriteFavourite } from "../../database";

type TPokemonCard = {
  id: number;
  fromRecent?: boolean;
  fromModal?: boolean;
};

// TODO forward ref problem for modal, need ref?
// eslint-disable-next-line react/display-name
// export const PokemonCard = React.forwardRef(
export const PokemonCard = ({
  id: pokemonId,
  fromRecent,
  fromModal,
}: TPokemonCard): JSX.Element => {
  console.log(`render PokemonCard with id: ${pokemonId}`);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const pokemon = useAppSelector((state) => state.pokemons.byId[pokemonId]);
  // // TODO refactor this case
  // if (!pokemon)
  //   return <p>Something is wrong there is no pokemon data available.</p>;

  // ? Should it be memoized?
  const { id } = pokemon;
  const isFavourite = pokemon.isFavourite;
  const isRecent = pokemon.isRecent;
  const isRandom = pokemon.isRandom;
  const { name, avatar, flavors } = pokemon.pokemonData;

  const handleOpenModal = () => {
    dispatch(openModal(pokemon));
  };

  const toggleSetIsHovered = () => {
    setIsHovered(!isHovered);
  };

  return (
    <article>
      <Card
        variant="outlined"
        sx={{ maxWidth: 345, m: 1 }}
        onMouseEnter={toggleSetIsHovered}
        onMouseLeave={toggleSetIsHovered}
      >
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
          title={`${name} ${id} fav:${isFavourite} rec:${isRecent} rand:${isRandom}`}
          // subheader="September 14, 2016"
        />

        {/* // card middle area */}
        <CardActionArea
          onClick={handleOpenModal}
          sx={{ display: "flex", flexDirection: "column" }}
        >
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
            ) : (
              <p>No flavors were provided. Something is wrong :(</p>
            )}
          </CardContent>
        </CardActionArea>

        {/* // card footer buttons */}
        {!fromModal && (
          <MyCardActions
            id={id}
            fromRecent={fromRecent}
            isFavourite={isFavourite}
            isHovered={isHovered}
            fromModal={fromModal}
            isRecent={isRecent}
          />
        )}
      </Card>
    </article>
  );
};
