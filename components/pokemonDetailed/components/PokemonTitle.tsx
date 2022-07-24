import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";
import {
  removeFavouritePokemon,
  addFavouritePokemon,
} from "../../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { TPokemon } from "../../../utils/types";

type TPokemonTitle = Pick<TPokemon, "id" | "isFavourite"> &
  Pick<TPokemon["pokemonData"], "name">;
export const PokemonTitle = ({ name, id, isFavourite }: TPokemonTitle) => {
  const dispatch = useAppDispatch();

  const handleFavourite = () => {
    if (isFavourite) {
      // dbRemoveFavourite(id);
      dispatch(removeFavouritePokemon(id));
      return;
    }
    // dbWriteFavourite(id);
    dispatch(addFavouritePokemon(id));
  };

  return (
    <Typography
      variant="h1"
      component="h1"
      fontWeight="700"
      sx={{ textTransform: "capitalize", padding: 3 }}
    >
      {name}
      <Button
        onClick={handleFavourite}
        sx={{ marginLeft: 2, borderRadius: "12px" }}
      >
        {isFavourite ? (
          <Favorite fontSize="large" color="primary" />
        ) : (
          <FavoriteBorder fontSize="large" color="primary" />
        )}
      </Button>
    </Typography>
  );
};
