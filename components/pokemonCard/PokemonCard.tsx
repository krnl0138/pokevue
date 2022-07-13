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

export const PokemonCard = ({
  openModal,
}: {
  openModal?: () => void;
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const recentSearch = useAppSelector((store) => store.recentSearch);

  // const [displayCard, setDisplayCard] = useState(false);

  const removeCard = () => {
    // setDisplayCard(false);
    dispatch(removeRecentCard(0));
  };

  const getFlavors = (pokemonSpecies) => {
    const flavors = pokemonSpecies.flavor_text_entries
      .slice(1, 3)
      .map((flavor) => `${flavor.flavor_text}\n`);
    return flavors;
  };

  const getName = (pokemon) => pokemon.name;
  const getAvatar = (pokemon) =>
    pokemon.sprites?.other["official-artwork"].front_default;

  return (
    <>
      {recentSearch.map((card, i) => (
        <article key={i}>
          <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
                  {getAvatar(card[0]) ? (
                    <Image
                      src={getAvatar(card[0])}
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
              title={getName(card[0])}
              // subheader="September 14, 2016"
            />

            <CardActionArea onClick={openModal}>
              {/* Change to placeholder image from /public */}
              {getAvatar(card[0]) ? (
                <Image
                  // <CardMedia
                  //   component="img"
                  height="140"
                  width="140"
                  src={getAvatar(card[0])}
                  alt="pokemon avatar"
                />
              ) : null}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {getName(card[0])}
                </Typography>
                {card[1] ? (
                  <Typography variant="body2" color="text.secondary">
                    {getFlavors(card[1])}
                  </Typography>
                ) : null}
              </CardContent>
            </CardActionArea>

            {openModal ? (
              <CardActions>
                <Button onClick={removeCard} size="small">
                  Remove
                </Button>
              </CardActions>
            ) : null}
          </Card>
        </article>
      ))}
    </>
  );
};
