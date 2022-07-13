import styles from "./searchForm.module.scss";
import { Send } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { fetchPokemon } from "../../lib/fetch-pokemon";
import { fetchPokemonSpecies } from "../../lib/fetch-pokemon-species";
import { Pokemon, PokemonSpecies } from "../../utils/types";

import { useDispatch } from "react-redux";

import { recentSearchSlice } from "../../lib/redux/slices/recentSearchSlice";

type TSearchForm = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setCurrentPokemon: (value: Pokemon) => void;
  setCurrentPokemonSpecies: (value: PokemonSpecies) => void;
  // TODO change type
  setRecentSearch: any;
};

export const SearchForm = ({
  searchValue,
  setSearchValue,
  setCurrentPokemon,
  setCurrentPokemonSpecies,
  setRecentSearch,
}: TSearchForm): JSX.Element => {
  const { actions } = recentSearchSlice;
  const dispatch = useDispatch();

  // form 'submit' button function
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const pokemon = await fetchPokemon(searchValue);
      const pokemonSpecies = await fetchPokemonSpecies(searchValue);
      setCurrentPokemon(pokemon);
      setCurrentPokemonSpecies(pokemonSpecies);
      setSearchValue("");

      const recentSearch: any = [pokemon, pokemonSpecies];
      // setRecentSearch(recentSearch);
      dispatch(actions.addRecentCard(recentSearch));
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="my-input">Pokemon Name</InputLabel>
          <Input
            className={styles.input}
            type="text"
            id="pokemon"
            aria-describedby="my-helper-text"
            size="small"
            fullWidth={true}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <FormHelperText id="my-helper-text">
            Find details about your pokemon
          </FormHelperText>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Search
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
