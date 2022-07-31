import React, { SyntheticEvent } from "react";
import {
  resetFilterBarValue,
  selectFilterBarValue,
  setFilterBarValue,
} from "../../lib/redux/slices/filterBarSlice";
import {
  getPokemon,
  handleRecentPokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { SubmitButtonComponent } from "../utils/forms/SubmitButtonComponent";
import { Container } from "@mui/system";
import { InputComponent } from "../utils/forms/InputComponent";
import { TMyChangeFormEvent } from "../../utils/types";
import { Box, Tooltip } from "@mui/material";

export const FilterBar = ({
  withSearch,
}: {
  withSearch?: boolean;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(selectFilterBarValue);

  const onFormChange = (e: TMyChangeFormEvent) => {
    dispatch(setFilterBarValue(e.target.value));
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!filterValue) return;
    const search = filterValue.toLowerCase();
    dispatch(resetFilterBarValue());
    try {
      const pokemon = await dispatch(getPokemon(search)).unwrap();
      dispatch(handleRecentPokemon(pokemon.id));
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const notOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const styleInput = {
    marginLeft: "auto",
    maxWidth: "20rem",
    marginRight: 2,
  };

  const styleMainContainer = {
    display: "flex",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 3,
  };

  return (
    <Container
      component="form"
      onSubmit={
        (withSearch ? handleOnSubmit : notOnSubmit) as typeof handleOnSubmit
      }
      sx={styleMainContainer}
    >
      <InputComponent
        fullWidth={true}
        size="small"
        label="Pokemon name"
        value={filterValue}
        onChange={onFormChange}
        customSX={styleInput}
        helperText={filterValue === "" ? "Pokemon name" : "Try 'pikachu'"}
      />

      {withSearch && (
        <Tooltip title="Only last 5 searches are visible" placement="bottom">
          <Box component="span">
            <SubmitButtonComponent text="Search" />
          </Box>
        </Tooltip>
      )}
    </Container>
  );
};
