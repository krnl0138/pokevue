import styles from "./searchForm.module.scss";
import { Search, Send } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPokemon, getPokemonTest } from "../../../lib/api/getPokemon";
import {
  setSearchValue,
  resetSearchValue,
} from "../../../lib/redux/slices/searchSlice";
import {
  addPokemon,
  toggleRecentPokemon,
} from "../../../lib/redux/slices/pokemonsSlice";

export const SearchForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.searchValue);

  const handleChange = (e: React.SyntheticEvent) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setSearchValue(result));
  };

  // form 'submit' button function
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    try {
      const data = await getPokemonTest(search);
      dispatch(addPokemon(data));
      dispatch(toggleRecentPokemon(data.id));
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
    dispatch(resetSearchValue());
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Typography>Find some pokemons!</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="my-input">Pokemon Name</InputLabel>
          <Input
            className={styles.input}
            type="text"
            id="searchValue"
            aria-describedby="my-helper-text"
            size="small"
            fullWidth={true}
            onChange={handleChange}
            value={searchValue}
          />
          {/* <FormHelperText id="my-helper-text">
            Find details about your pokemon
          </FormHelperText> */}
        </FormControl>
        <Button type="submit" variant="contained" endIcon={<Search />}>
          Search
        </Button>
      </form>
    </Container>
  );
};
