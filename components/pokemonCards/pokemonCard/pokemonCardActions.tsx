import {
  Favorite,
  FavoriteBorder,
  Segment,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import {
  CardActions,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  addRecentPokemon,
  removeRecentPokemon,
  removeFavouritePokemon,
  addFavouritePokemon,
} from "../../../lib/redux/slices/pokemonsSlice";
import { useAppDispatch } from "../../../utils/hooks";
import { URLS } from "../../../utils/constants";

type TCardActions = {
  id: number;
  isFavourite: boolean;
  isHovered: boolean;
  isRecent: boolean;
  inRecent: boolean;
};

export const PokemonCardActions = ({
  id,
  isHovered,
  isFavourite,
  isRecent,
}: TCardActions) => {
  console.log(isRecent);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleRecent = () => {
    isRecent
      ? dispatch(removeRecentPokemon(id))
      : dispatch(addRecentPokemon(id));
  };

  const handleFavourite = () => {
    if (isFavourite) {
      // dbRemoveFavourite(id);
      dispatch(removeFavouritePokemon(id));
      return;
    }
    // dbWriteFavourite(id);
    dispatch(addFavouritePokemon(id));
  };

  const handleOpenPokemonScreen = () => {
    router.push(`${URLS.pokemon}/${id}`);
  };

  return (
    <CardActions
      sx={{
        justifyContent: "center",
        minHeight: "72px",
      }}
    >
      {isHovered && (
        <BottomNavigation>
          {isRecent && (
            <Tooltip title="Delete from recent search">
              <BottomNavigationAction
                onClick={handleRecent}
                icon={<DeleteOutlineOutlined fontSize="small" />}
                sx={{ color: "#1f88e5" }}
              />
            </Tooltip>
          )}

          <Tooltip title="Add to favourites">
            <BottomNavigationAction
              onClick={handleFavourite}
              icon={
                isFavourite ? (
                  <Favorite fontSize="small" />
                ) : (
                  <FavoriteBorder fontSize="small" />
                )
              }
              sx={{ color: "#1f88e5" }}
            />
          </Tooltip>

          <Tooltip title="Learn about this pokemon">
            <BottomNavigationAction
              onClick={handleOpenPokemonScreen}
              icon={<Segment fontSize="small" />}
              sx={{ color: "#1f88e5" }}
            />
          </Tooltip>
        </BottomNavigation>
      )}
    </CardActions>
  );
};
