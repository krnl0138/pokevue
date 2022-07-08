import { GetStaticProps } from "next";
import Image from "next/image";
// import { pokemonAPI } from "../utils/constants";
import { Pokemon, PokemonFlavor } from "../utils/types";
import * as pokemonReturnedAPI from "../utils/pokemonReturnedAPI.json";
import * as pokemonSpeciesReturnedAPI from "../utils/pokemonSpeciesReturnesAPI.json";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Layout } from "../components/layout";
import {
  TextField,
  Button,
  Card,
  //   CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
  CardHeader,
  Avatar,
  IconButton,
} from "@mui/material";
import { getPokemon } from "../lib/fetch-pokemon";
import { getPokemonSpecies } from "../lib/fetch-pokemon-species";
import { red } from "@mui/material/colors";

export const getStaticProps: GetStaticProps = async () => {
  const pokemon: Pokemon = await getPokemon();
  const pokemonSpecies = await getPokemonSpecies();

  return { props: { pokemon, pokemonSpecies } };
};

const SearchBar = (): JSX.Element => {
  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained">Search</Button>
    </div>
  );
};

// export const PokemonCard = ({
//   pokemon,
//   pokemonSpecies,
// }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {

export const PokemonCard = (): JSX.Element => {
  const pokemonFlavor = pokemonSpeciesReturnedAPI.flavor_text_entries
    .slice(1, 3)
    .map((flavor: PokemonFlavor) => `${flavor.flavor_text}\n`);

  const pokemonNameCapitalize =
    pokemonReturnedAPI.name.charAt(0).toUpperCase() +
    pokemonReturnedAPI.name.slice(1);

  const pokemonImage =
    pokemonReturnedAPI.sprites.other["official-artwork"].front_default;

  return (
    <Layout>
      <h1>Find your pokemons!</h1>
      <SearchBar />

      <Card variant="outlined" sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardActionArea>
          <Image
            // <CardMedia
            //   component="img"
            height="140"
            width="140"
            src={pokemonImage}
            alt="pokemon avatar"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemonNameCapitalize}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pokemonFlavor}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small">Remove</Button>
        </CardActions>
      </Card>
    </Layout>
  );
};

export default PokemonCard;
