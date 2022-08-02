import { FilterBar } from "../components/filterBar/FilterBar";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { Layout } from "../components/utils/layout/Layout";
import { selectFilterBarValue } from "../lib/redux/slices/filterBarSlice";
import {
  selectAllPokemons,
  selectFavouriteIds,
} from "../lib/redux/slices/pokemonsSlice";
import { useAppSelector } from "../utils/hooks";

export const Favourites = () => {
  const favouriteIds = useAppSelector(selectFavouriteIds);
  const filter = useAppSelector(selectFilterBarValue);
  const pokemons = useAppSelector(selectAllPokemons);

  // filter logic
  const favouritePokemons = favouriteIds.map((id) => pokemons[id]);
  const filterIds = favouritePokemons
    .filter((r) => r.pokemonData.name.includes(filter))
    .map((r) => r.id);

  return (
    <ProtectedRoute>
      <Layout>
        <FilterBar />
        {favouriteIds.length > 0 && (
          <PokemonCards ids={filterIds.length > 0 ? filterIds : favouriteIds} />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Favourites;
