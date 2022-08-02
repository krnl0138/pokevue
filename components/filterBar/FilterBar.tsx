import React, { SyntheticEvent, useEffect } from "react";
import {
  resetFilterBarValue,
  selectFilterBarValue,
  setFilterBarPending,
  setFilterBarFailed,
  setFilterBarValue,
  selectFilterBarFailed,
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
import { Alert, Box, Tooltip } from "@mui/material";

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

type TFilterBar = {
  labelFocus?: string;
  withSearch?: boolean;
};
export const FilterBar = ({
  labelFocus = "Pokemon name",
  withSearch,
}: TFilterBar): JSX.Element => {
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(selectFilterBarValue);
  const requestFilterFailed = useAppSelector(selectFilterBarFailed);

  const onFormChange = (e: TMyChangeFormEvent) => {
    dispatch(setFilterBarValue(e.target.value));
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!filterValue) return;
    const search = filterValue.toLowerCase().trim();
    dispatch(resetFilterBarValue());
    try {
      dispatch(setFilterBarPending(true));
      const pokemon = await dispatch(getPokemon(search)).unwrap();
      dispatch(handleRecentPokemon(pokemon.id));
      dispatch(setFilterBarPending(false));
    } catch (e) {
      console.log(e);
      dispatch(setFilterBarFailed());
    }
  };

  const notOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!requestFilterFailed) return;
    setTimeout(() => {
      const errorAlert = document.getElementById("pokemon-not-found");
      if (!errorAlert) return;
      errorAlert.style.display = "none";
    }, 2000);
  }, [requestFilterFailed]);

  return (
    <>
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
          labelFocus={labelFocus}
        />

        {withSearch && (
          <Tooltip title="Only last 5 searches are visible" placement="bottom">
            <Box component="span">
              <SubmitButtonComponent text="Search" />
            </Box>
          </Tooltip>
        )}
      </Container>
      {requestFilterFailed && (
        <Container id="pokemon-not-found">
          <Alert severity="error">No pokemon was found! Try again.</Alert>
        </Container>
      )}
    </>
  );
};
