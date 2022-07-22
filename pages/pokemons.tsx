import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/utils/layout/Layout";
import { PokemonCards } from "../components/pokemonCards/PokemonCards";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { FilterBar } from "../components/filterBar/FilterBar";
import { TPokemon } from "../utils/types";
import { getPokemon } from "../lib/api/getPokemon";
import { NUM_RANDOM_POKEMON_CADRS } from "../utils/constants";
import { createRandomIds } from "../utils/functions";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {
  addPokemon,
  addRandomPokemon,
  removePokemon,
} from "../lib/redux/slices/pokemonsSlice";
import { ModalCardWrapper } from "../components/utils/modal/ModalCardWrapper";
import { URLS } from "../utils/constants";
import Link from "next/link";

export async function getServerSideProps() {
  const ids = createRandomIds(NUM_RANDOM_POKEMON_CADRS);
  const fetchedPokemons = await Promise.all(
    ids.map(async (id) => await getPokemon(id))
  );

  return { props: { fetchedPokemons } };
}

export const Pokemons = ({
  fetchedPokemons,
}: {
  fetchedPokemons: TPokemon[];
}) => {
  const dispatch = useAppDispatch();
  // remove unused randoms from store on unmount
  // replace to test createSelector() -> still not working
  const randomIds = useAppSelector((state) => state.pokemons.randomIds);
  const favIds = useAppSelector((state) => state.pokemons.favouriteIds);
  const recIds = useAppSelector((state) => state.pokemons.recentIds);
  const randomsToRemove = randomIds?.filter(
    (id) => !recIds.includes(id) && !favIds.includes(id)
  );

  // TODO it doesn't listen correctly
  // const randomsToRemove = useAppSelector(selectRandomsToRemove);
  useEffect(
    () => () => {
      console.log("randomsToRemove: ", randomsToRemove);
      randomsToRemove.forEach((id) => dispatch(removePokemon(id)));
    },
    []
  );

  // filter logic
  const filter = useAppSelector((state) => state.filterBar.filterValue);
  const pokemons = useAppSelector((state) => state.pokemons.byId);
  const randoms = randomIds.map((id) => pokemons[id]);
  // TODO is it helpful?
  const filteredIds = useMemo(
    () =>
      randoms
        .filter((r) => r.pokemonData.name.includes(filter))
        .map((r) => r.id),
    [filter]
  );

  const [isFetched, setIsFetched] = useState(false);
  if (fetchedPokemons) {
    if (!isFetched) return;
    setIsFetched(true);
    fetchedPokemons.forEach((pok) => {
      dispatch(addPokemon(pok));
      dispatch(addRandomPokemon(pok.id));
    });
  }

  return (
    <ProtectedRoute>
      <Layout>
        <h2>
          You have {favIds.length} favourite pokemons!{" "}
          <Link href={URLS.home}>Want to catch more?</Link>
        </h2>
        <FilterBar />
        {randomIds.length > 0 && (
          <PokemonCards
            ids={filteredIds.length > 0 ? filteredIds : randomIds}
          />
        )}
        <ModalCardWrapper />
      </Layout>
    </ProtectedRoute>
  );
};

export default Pokemons;
