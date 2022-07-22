import { SyntheticEvent } from "react";
import { getPokemon } from "../../lib/api/getPokemon";
import {
  resetFilterBarValue,
  selectFilterBarValue,
  setFilterBarValue,
} from "../../lib/redux/slices/filterBarSlice";
import {
  addPokemon,
  addRecentPokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { InputComponent } from "../forms/InputComponent";
import { SubmitButtonComponent } from "../forms/SubmitButtonComponent";

export const FilterBar = ({
  withSearch,
}: {
  withSearch?: boolean;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(selectFilterBarValue);

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
        <InputComponent
          label="Pokemon name"
          id="filterValue"
          action={setFilterBarValue}
          value={filterValue}
          helperText="Search pokemons by names!"
        />

        {withSearch && <SubmitButtonComponent title="Search" />}
      </form>
    </div>
  );
};
