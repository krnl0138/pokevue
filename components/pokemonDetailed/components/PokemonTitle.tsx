import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { handleFavouritePokemon } from "../../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { PokemonDetailedContext } from "../pokemonDetailedContext";

export const PokemonTitle = () => {
  const dispatch = useAppDispatch();
  const { id, isFavourite, pokemonData } = useContext(PokemonDetailedContext);
  const { name } = pokemonData;

  const styleHeading = { textTransform: "capitalize", padding: 3 };
  const styleButton = { marginLeft: 2, borderRadius: "12px" };
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Typography
      variant="h1"
      component="h1"
      fontWeight="700"
      sx={
        smScreen
          ? {
              ...styleHeading,
              fontSize: "2.5rem",
              lineHeight: "0.8",
              textAlign: "center",
            }
          : mdScreen
          ? {
              ...styleHeading,
              fontSize: "4rem",
              lineHeight: "0.8",
              textAlign: "center",
            }
          : styleHeading
      }
    >
      {name}
      <Button
        onClick={() => dispatch(handleFavouritePokemon(id))}
        sx={
          smScreen
            ? {
                ...styleButton,
                " svg": { fontSize: "1.5rem" },
              }
            : mdScreen
            ? {
                ...styleButton,
                " svg": { fontSize: "2rem" },
              }
            : styleButton
        }
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
