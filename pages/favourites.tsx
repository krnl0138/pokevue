import React from "react";
import { PokemonCard } from "../components/pokemonCards/pokemonCard/PokemonCard";
import { Layout } from "../components/utils/layout/Layout";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { useAppSelector } from "../utils/hooks";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { FilterBar } from "../components/filterBar/FilterBar";
import Box from "@mui/material/Box";
import { ModalView } from "../components/utils/modalView/ModalView";

export const Favourites = () => {
  const favIds = useAppSelector((state) => state.pokemons.favouriteIds);

  // filter logic
  const filter = useAppSelector((state) => state.filterBar.filterValue);
  const pokemons = useAppSelector((state) => state.pokemons.byId);
  const favs = favIds.map((id) => pokemons[id]);
  const filterIds = favs
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <div
          style={{
            position: "fixed",
            top: 200,
            left: 0,
            right: "0",
            width: "10px",
            background: "#000000",
            bottom: "0",
            transform: "scaleY(0px)",
          }}
        ></div>
        <FilterBar />
        <Box>
          {favIds.length > 0 && (
            <PokemonCards ids={filterIds.length > 0 ? filterIds : favIds} />
          )}
        </Box>
        <ModalView>
          <PokemonCard />
        </ModalView>
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
