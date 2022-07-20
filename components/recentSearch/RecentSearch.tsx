import styles from "./RecentSearch.module.scss";
import { Search } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getPokemon } from "../../lib/api/getPokemon";
import {
  setSearchValue,
  resetSearchValue,
} from "../../lib/redux/slices/searchSlice";
import {
  addPokemon,
  addRecentPokemon,
} from "../../lib/redux/slices/pokemonsSlice";

export const RecentSearch = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.searchValue);

  const handleChange = (e: React.SyntheticEvent) => {
    const result = { [e.currentTarget.id]: e.currentTarget.value };
    dispatch(setSearchValue(result));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    try {
      const pokemon = await getPokemon(search);
      dispatch(addPokemon(pokemon));
      dispatch(addRecentPokemon(pokemon.id));
    } catch (e: any) {
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
        </FormControl>
        <Button type="submit" variant="contained" endIcon={<Search />}>
          Search
        </Button>
      </form>
    </Container>
  );
};
