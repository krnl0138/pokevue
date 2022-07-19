import { Box } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../utils/heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { useEffect, useRef } from "react";
import Sortable from "sortablejs";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../lib/redux";
import { CardsWrapper } from "../utils/cardsWrapper/CardsWrapper";

const selectPokemons = (state: RootState) => state.pokemons.byId;
const selectRecentIds = (state: RootState) => state.pokemons.recentIds;
const selectRecentPokemons = createSelector(
  selectPokemons,
  selectRecentIds,
  (pokemons, recentIds) => recentIds?.map((r) => pokemons[r])
);

export const RecentSearch = ({ children }: { children?: JSX.Element }) => {
  const recentPokemons = useAppSelector(selectRecentPokemons);

  return (
    recentPokemons && (
      <>
        <Heading title={"Recent search"} />
        <Box sx={{ display: "flex" }}>
          <CardsWrapper>
            {recentPokemons.map((data) => (
              <PokemonCard key={data.id} data={data} fromRecent={true} />
            ))}
          </CardsWrapper>
        </Box>
      </>
    )
  );
};
