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
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { getPokemon } from "../../../lib/api/getPokemon";
import { setSearchValue } from "../../../lib/redux/slices/searchSlice";
import {
  addPokemon,
  toggleRecentPokemon,
} from "../../../lib/redux/slices/pokemonsSlice";

export const SearchForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.value);

  // form 'submit' button function
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const search = searchValue.toLowerCase();
    try {
      const data = await getPokemon(search);
      dispatch(addPokemon(data));
      dispatch(toggleRecentPokemon(data.id));
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    }
    dispatch(setSearchValue(""));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="my-input">Pokemon Name</InputLabel>
          <Input
            className={styles.input}
            type="text"
            id="pokemonInput"
            aria-describedby="my-helper-text"
            size="small"
            fullWidth={true}
            onChange={(e) => {
              dispatch(setSearchValue(e.target.value));
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
