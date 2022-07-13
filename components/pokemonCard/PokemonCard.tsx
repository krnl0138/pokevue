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
import { useContext, useEffect, useState } from "react";
import { PokemonSpecies } from "../../utils/types";
import Image from "next/image";
import { blue } from "@mui/material/colors";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import { PokemonContext } from "../../lib/test-pokemon-context";

// eslint-disable-next-line react/display-name
const HoverOnRemoveButton = React.memo(() => {
  return <p>Hello World</p>;
});

export const PokemonCard = ({
  // currentPokemon,
  currentPokemonSpecies,
  openModal,
}: {
  // currentPokemon: Pokemon;
  currentPokemonSpecies: PokemonSpecies;
  openModal?: () => void;
}): JSX.Element => {
  const [displayCard, setDisplayCard] = useState(false);
  const [pokemonFlavor, setPokemonFlavor] = useState<string[]>([]);
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonName, setPokemonName] = useState("");

  const removeCard = () => {
    setDisplayCard(false);
    setPokemonFlavor([]);
    setPokemonName("");
    setPokemonImage("");
  };

  // Test functionality
  // state for button hover (can be rewritten in CSS)
  const [showRemoveHover, setShowRemoveHover] = useState(false);
  const removeOnMouseEnter = () => {
    setShowRemoveHover(true);
  };
  const removeOnMouseLeave = () => {
    setShowRemoveHover(false);
  };

  // TEST functionality
  // get data from useContext
  const currentPokemon = useContext(PokemonContext);

  useEffect(() => {
    if (currentPokemonSpecies?.flavor_text_entries) {
      const flavors = currentPokemonSpecies.flavor_text_entries
        .slice(1, 3)
        .map((flavor) => `${flavor.flavor_text}\n`);
      setPokemonFlavor(flavors);
    }
    if (currentPokemon && currentPokemon.name) {
      setDisplayCard(true);

      const nameCapitalize =
        currentPokemon.name.charAt(0).toUpperCase() +
        currentPokemon.name.slice(1);
      setPokemonName(nameCapitalize);
      setPokemonImage(
        currentPokemon.sprites?.other["official-artwork"].front_default
      );
    }
  }, [currentPokemon, currentPokemonSpecies]);

  return (
    <>
      {displayCard ? (
        <article>
          <Card variant="outlined" sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
                  {pokemonImage ? (
                    <Image
                      src={pokemonImage}
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
              title={pokemonName}
              // subheader="September 14, 2016"
            />

            <CardActionArea onClick={openModal}>
              {/* Change to placeholder image from /public */}
              {pokemonImage ? (
                <Image
                  // <CardMedia
                  //   component="img"
                  height="140"
                  width="140"
                  src={pokemonImage}
                  alt="pokemon avatar"
                />
              ) : null}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemonName}
                </Typography>
                {pokemonFlavor ? (
                  <Typography variant="body2" color="text.secondary">
                    {pokemonFlavor}
                  </Typography>
                ) : null}
              </CardContent>
            </CardActionArea>

            {openModal ? (
              <CardActions>
                <Button
                  onClick={removeCard}
                  size="small"
                  onMouseEnter={removeOnMouseEnter}
                  onMouseLeave={removeOnMouseLeave}
                >
                  Remove
                </Button>
                {/* test functionality */}
                {showRemoveHover && <HoverOnRemoveButton />}
              </CardActions>
            ) : null}
          </Card>
        </article>
      ) : null}
    </>
  );
};
