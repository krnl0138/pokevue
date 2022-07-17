import { Send } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";

export const SearchAllPokemons = ({
  onChange,
}: {
  onChange: (query: string) => void;
}): JSX.Element => {
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
            onChange={(e) => onChange(e.target.value)}
          />
          <FormHelperText id="my-helper-text">
            Search pokemons by names!
          </FormHelperText>
        </FormControl>
      </form>
    </div>
  );
};
