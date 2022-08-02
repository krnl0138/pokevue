import { FilterBar } from "../components/filterBar/FilterBar";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { Layout } from "../components/utils/layout/Layout";
import { selectFilterBarValue } from "../lib/redux/slices/filterBarSlice";
import {
  selectAllPokemons,
  selectRecentIds,
} from "../lib/redux/slices/pokemonsSlice";
import { useAppSelector } from "../utils/hooks";

export const Search = () => {
  const recentIds = useAppSelector(selectRecentIds);
  const filter = useAppSelector(selectFilterBarValue);
  const pokemons = useAppSelector(selectAllPokemons);

  /* Filter logic */
  const recentPokemons = recentIds.map((id) => pokemons[id]);
  const filterIds = recentPokemons
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar labelFocus="Try 'pikachu' or '150'" withSearch={true} />
        {recentIds.length > 0 && (
          <PokemonCards
            inRecent={true}
            ids={filterIds ? filterIds : recentIds}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Search;
