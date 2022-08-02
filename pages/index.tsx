import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { FilterBar } from "../components/filterBar/FilterBar";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { Layout } from "../components/utils/layout/Layout";
import { retrievePokemon } from "../lib/api/retrievePokemon";
import { selectFilterBarValue } from "../lib/redux/slices/filterBarSlice";
import {
  addPokemons,
  addRandomPokemon,
  selectAllIds,
  selectAllPokemons,
  selectRandomIds,
} from "../lib/redux/slices/pokemonsSlice";
import {
  NUM_POKEMONS_TO_LOAD_MORE,
  NUM_RANDOM_POKEMON_CADRS,
} from "../utils/constants";
import { createRandomIds } from "../utils/functions";
import {
  useAppDispatch,
  useAppSelector,
  useInfiniteScroll,
} from "../utils/hooks";
import { TPokemon } from "../utils/types";

export async function getServerSideProps() {
  const ids = createRandomIds(NUM_RANDOM_POKEMON_CADRS);
  const serverRandoms = await Promise.all(
    ids.map(async (id) => await retrievePokemon(id))
  );
  return { props: { serverRandoms } };
}

export const Index = ({ serverRandoms }: { serverRandoms: TPokemon[] }) => {
  const dispatch = useAppDispatch();
  const allIds = useAppSelector(selectAllIds);
  const randomIds = useAppSelector(selectRandomIds);
  const filterValue = useAppSelector(selectFilterBarValue);
  const pokemons = useAppSelector(selectAllPokemons);
  const [filterIds, setFilterIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatchPokemons = (pokemons: TPokemon[]) => {
    console.log("initial pokemons ", pokemons);
    const noDuplicates = pokemons.filter((p) => !allIds.includes(p.id));
    console.log("no duplicates pokemons ", noDuplicates);
    dispatch(addPokemons(noDuplicates));
    // TODO shouldn't dispatch to many actions at once
    noDuplicates.forEach((p) => dispatch(addRandomPokemon(p.id)));
  };

  useEffect(() => {
    if (!serverRandoms) return;
    dispatchPokemons(serverRandoms);
  }, [serverRandoms]);

  /* LoadMore on scroll logic */
  const handleLoadMore = async () => {
    setLoading(true);
    const ids = createRandomIds(NUM_POKEMONS_TO_LOAD_MORE);
    const morePokemons = await Promise.all(
      ids.map(async (id) => await retrievePokemon(id))
    );
    setLoading(false);
    dispatchPokemons(morePokemons);
  };
  const loadMoreButtonRef = useInfiniteScroll(handleLoadMore, filterValue);

  /* Filter logic */
  useEffect(() => {
    if (!randomIds || !pokemons) return;
    const randomPokemons = randomIds.map((id) => pokemons[id]);
    const filteredIds = randomPokemons
      .filter((r) => r.pokemonData.name.includes(filterValue))
      .map((r) => r.id);
    setFilterIds(filteredIds);
  }, [randomIds, filterValue, pokemons]);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar labelFocus="Filter pokemons" />
        {randomIds.length > 0 && (
          <Box sx={{ textAlign: "center" }}>
            <PokemonCards
              loading={loading}
              ids={filterIds.length > 0 ? filterIds : randomIds}
            />
            {loading ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <Button
                onClick={handleLoadMore}
                ref={loadMoreButtonRef}
                variant="outlined"
                sx={{ marginTop: "2rem" }}
              >
                Load more
              </Button>
            )}
          </Box>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Index;
