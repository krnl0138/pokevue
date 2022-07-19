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
import {
  Delete,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Search,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useAppDispatch } from "../../utils/hooks";

import { closeModal, openModal } from "../../lib/redux/slices/modalSlice";
import {
  addRecentPokemon,
  removeFavouritePokemon,
  addFavouritePokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useRouter } from "next/router";

import {
  PROJECT_URLS as urls,
  AVATAR_PLACEHOLDER as placeholder,
} from "../../utils/constants";
import { Pokemon } from "../../utils/types";
import { dbRemoveFavourite, dbWriteFavourite } from "../../database";

type TPokemonCard = {
  data?: Pokemon;
  fromRecent?: boolean;
  fromModal?: boolean;
};

// TODO forward ref problem for modal, need ref?
// eslint-disable-next-line react/display-name
export const PokemonCard = React.forwardRef(
  ({ data, fromRecent, fromModal }: TPokemonCard): JSX.Element => {
    console.log(`render PokemonCard with id: ${data.id}`);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState(false);

    // TODO refactor
    if (!data) return <p>Something is wrong there is no data available.</p>;
    const id = data.id;
    const isFavourite = data.isFavourite;
    const isRecent = data.isRecent;
    const { name, avatar, flavors } = data.pokemonData;

    const handleRecent = () => {
      dispatch(addRecentPokemon(id));
    };

    const handleFavourite = () => {
      if (isFavourite) {
        console.log(`for id:${id} isFavourite was true`);
        dbRemoveFavourite(id);
        dispatch(closeModal());
        dispatch(removeFavouritePokemon(id));
        return;
      }
      dbWriteFavourite(id);
      dispatch(addFavouritePokemon(id));
    };

    const handleOpenPokemonScreen = () => {
      router.push(`${urls.pokemon}/${id}`);
    };

    const handleOpenModal = () => {
      dispatch(openModal(data));
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
          {fromModal ? null : (
            <CardActions>
              {isHovered ? (
                <>
                  {fromRecent ? (
                    <Tooltip title="Delete from recent">
                      <Button onClick={handleRecent} size="small">
                        <Delete />
                      </Button>
                    </Tooltip>
                  ) : null}
                  <Tooltip
                    title={
                      isFavourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    <Button onClick={handleFavourite} size="small">
                      {isFavourite ? <Favorite /> : <FavoriteBorder />}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Learn more">
                    <Button onClick={handleOpenPokemonScreen} size="small">
                      <Search />
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <p></p>
              )}
            </CardActions>
          )}
        </Card>
      </article>
    );
  }
);
