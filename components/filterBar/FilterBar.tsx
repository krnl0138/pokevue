import { SyntheticEvent } from "react";
import { getPokemon } from "../../lib/api/getPokemon";
import {
  resetFilterBarValue,
  setFilterBarValue,
} from "../../lib/redux/slices/filterBarSlice";
import {
  addPokemon,
  addRecentPokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { InputWrapper } from "../forms/InputWrapper";
import { SubmitButtonWrapper } from "../forms/SubmitButtonWrapper";

export const FilterBar = ({
  withSearch,
}: {
  withSearch?: boolean;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { filterValue } = useAppSelector((state) => state.filterBar);

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const search = filterValue.toLowerCase();
    dispatch(resetFilterBarValue());
    try {
      const pokemon = await getPokemon(search);
      dispatch(addPokemon(pokemon));
      dispatch(addRecentPokemon(pokemon.id));
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const notOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={
          (withSearch ? handleOnSubmit : notOnSubmit) as typeof handleOnSubmit
        }
      >
        <InputWrapper
          label="Pokemon name"
          id="filterValue"
          action={setFilterBarValue}
          value={filterValue}
          helperText="Search pokemons by names!"
        />

        {withSearch && <SubmitButtonWrapper title="Search" />}
      </form>
    </div>
  );
};
