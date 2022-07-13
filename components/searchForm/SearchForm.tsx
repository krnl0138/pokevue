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
import { addRecentCard } from "../../lib/redux/slices/recentSearchSlice";
import { useAppDispatch } from "../../utils/hooks";

type TSearchForm = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const getPokemon = async (search) => {
  const pokemon = await fetchPokemon(search);
  const pokemonSpecies = await fetchPokemonSpecies(search);
  return [pokemon, pokemonSpecies];
};

export const SearchForm = ({
  searchValue,
  setSearchValue,
}: TSearchForm): JSX.Element => {
  const dispatch = useAppDispatch();

  // form 'submit' button function
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    try {
      const recentSearch = await getPokemon(search);
      dispatch(addRecentCard(recentSearch));
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
    setSearchValue("");
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
