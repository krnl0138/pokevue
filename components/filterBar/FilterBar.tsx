import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { setFilterRandomsValue } from "../../lib/redux/slices/filterBarSlice";
import { useAppDispatch } from "../../utils/hooks";

export const FilterBar = ({}: {}): JSX.Element => {
  const dispatch = useAppDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterRandomsValue(e.target.value));
  };

  return (
    <div>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Pokemon Name</InputLabel>
          <Input
            type="text"
            id="searchAllValue"
            aria-describedby="my-helper-text"
            size="small"
            fullWidth={true}
            onChange={onChange}
          />
          <FormHelperText id="my-helper-text">
            Search pokemons by names!
          </FormHelperText>
        </FormControl>
      </form>
    </div>
  );
};
