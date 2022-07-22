import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { FilterBar } from "../components/filterBar/FilterBar";
import Box from "@mui/material/Box";
import { ModalCardWrapper } from "../components/utils/modal/ModalCardWrapper";
import { selectFilterBarValue } from "../lib/redux/slices/filterBarSlice";
import {
  selectAllPokemons,
  selectFavouriteIds,
} from "../lib/redux/slices/pokemonsSlice";

export const Favourites = () => {
  const favIds = useAppSelector(selectFavouriteIds);

  // filter logic
  const filter = useAppSelector(selectFilterBarValue);
  const pokemons = useAppSelector(selectAllPokemons);
  const favs = favIds.map((id) => pokemons[id]);
  const filterIds = favs
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar />
        <Box>
          {favIds.length > 0 && (
            <PokemonCards ids={filterIds.length > 0 ? filterIds : favIds} />
          )}
        </Box>
        <ModalCardWrapper />
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
