import { Delete, Favorite, FavoriteBorder, Search } from "@mui/icons-material";
import { Tooltip, Button, CardActions } from "@mui/material";
import router from "next/router";
import { closeModal } from "../../lib/redux/slices/modalSlice";
import {
  addRecentPokemon,
  removeRecentPokemon,
  removeFavouritePokemon,
  addFavouritePokemon,
} from "../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch } from "../../utils/hooks";
import { PROJECTS_ULRS as urls } from "../../utils/constants";

type TCardActions = {
  id: number;
  isFavourite: boolean;
  isHovered: boolean;
  isRecent: boolean;
  fromRecent: boolean;
  fromModal: boolean;
};

export const MyCardActions = ({
  id,
  isHovered,
  isFavourite,
  fromRecent,
  isRecent,
  fromModal,
}: TCardActions) => {
  const dispatch = useAppDispatch();
  const handleRecent = () => {
    isRecent
      ? dispatch(addRecentPokemon(id))
      : dispatch(removeRecentPokemon(id));
  };

  const handleFavourite = () => {
    if (isFavourite) {
      // dbRemoveFavourite(id);
      fromModal ? dispatch(closeModal()) : null;
      dispatch(removeFavouritePokemon(id));
      return;
    }
    // dbWriteFavourite(id);
    dispatch(addFavouritePokemon(id));
  };

  const handleOpenPokemonScreen = () => {
    router.push(`${urls.pokemon}/${id}`);
  };

  return (
    <CardActions>
      {isHovered ? (
        <>
          {fromRecent ? (
            <Tooltip title="Delete from recent">
              <Button onClick={handleRecent} size="small">
                <Delete />
              </Button>
            </Tooltip>
          ) : null}
          <Tooltip
            title={isFavourite ? "Remove from favourites" : "Add to favourites"}
          >
            <Button onClick={handleFavourite} size="small">
              {isFavourite ? <Favorite /> : <FavoriteBorder />}
            </Button>
          </Tooltip>
          <Tooltip title="Learn more">
            <Button onClick={handleOpenPokemonScreen} size="small">
              <Search />
            </Button>
          </Tooltip>
        </>
      ) : (
        <p></p>
      )}
    </CardActions>
  );
};
