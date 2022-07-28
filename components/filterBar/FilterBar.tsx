import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import React, { SyntheticEvent } from "react";
import {
  resetFilterBarValue,
  selectFilterBarValue,
  setFilterBarValue,
} from "../../lib/redux/slices/filterBarSlice";
import {
  addPokemon,
  handleRecentPokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { SubmitButtonComponent } from "../forms/SubmitButtonComponent";
import { dbInterface } from "../../lib/api/dbInterface";
import { Container } from "@mui/system";

export const FilterBar = ({
  withSearch,
}: {
  withSearch?: boolean;
}): JSX.Element => {
  const db = dbInterface();
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(selectFilterBarValue);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterBarValue(e.target.value));
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!filterValue) return;
    const search = filterValue.toLowerCase();
    dispatch(resetFilterBarValue());
    try {
      const pokemon = await dispatch(addPokemon(search)).unwrap();
      dispatch(handleRecentPokemon(pokemon.id));
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const notOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <form
        onSubmit={
          (withSearch ? handleOnSubmit : notOnSubmit) as typeof handleOnSubmit
        }
      >
        <FormControl>
          <Input
            id="filterBar"
            aria-describedby={`filterBar-helper`}
            onChange={onFormChange}
            value={filterValue}
          />
        </FormControl>

        {withSearch && <SubmitButtonComponent title="Search" />}
      </form>
    </Container>
  );
};
