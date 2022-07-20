import { Box } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../utils/heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { NoFavourites } from "./NoFavourites";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../lib/redux";
import { CardsWrapper } from "../utils/cardsWrapper/CardsWrapper";

const selectFavourites = createSelector(
  (state: RootState) => state.pokemons.byId,
  (state: RootState) => state.pokemons.favouriteIds,
  (pokemons, favIds) => favIds?.map((id) => pokemons[id])
);

export const FavouritePokemons = ({ children }: { children?: JSX.Element }) => {
  const favouritePokemons = useAppSelector(selectFavourites);
  console.log(favouritePokemons);

  return (
    <>
      <Heading title={"Your favourite pokemons"} />
      <Box>
        {favouritePokemons.length > 0 ? (
          <CardsWrapper>
            {favouritePokemons.map((data) => (
              <PokemonCard key={data.id} data={data} />
            ))}
          </CardsWrapper>
        ) : (
          <NoFavourites />
        )}
      </Box>
    </>
  );
};
