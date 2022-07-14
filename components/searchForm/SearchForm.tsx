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
import { addRecentCard } from "../../lib/redux/slices/recentSearchSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { getPokemon } from "../../lib/api/getPokemon";
import { setSearchValue } from "../../lib/redux/slices/searchSlice";

export const SearchForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.search.value);

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
            id="pokemon"
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
