import {
  Favorite,
  FavoriteBorder,
  DeleteOutlineOutlined,
  ReadMore,
} from "@mui/icons-material";
import {
  CardActions,
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../utils/hooks";
import { URLS } from "../../../../utils/constants";
import {
  handleRecentPokemon,
  handleFavouritePokemon,
} from "../../../../lib/redux/slices/pokemonsSlice";
import { useContext } from "react";
import { PokemonCardContext } from "../pokemonCardContext";
import { SnackCardsContext } from "../../PokemonCards";

const styleDark = { backgroundColor: "rgb(14 45 81)" };
const styleBottomNavigationAction = { color: "#1f88e5" };
const styleCardActions = {
  justifyContent: "center",
  minHeight: "72px",
};

export const PokemonCardActions = () => {
  const { id, isFavourite, isRecent, inRecent, isHovered } =
    useContext(PokemonCardContext);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenDetailedPokemon = () => {
    router.push(`${URLS.pokemon}/${id}`);
  };

  const { setSnackFav } = useContext(SnackCardsContext);
  const theme = useTheme();
  return (
    <>
      <CardActions sx={styleCardActions}>
        {isHovered && (
          <BottomNavigation
            sx={theme.palette.mode === "light" ? {} : styleDark}
          >
            {inRecent && isRecent && (
              <Tooltip title="Delete from recent search">
                <BottomNavigationAction
                  sx={styleBottomNavigationAction}
                  onClick={() => {
                    dispatch(handleRecentPokemon(id, isRecent));
                  }}
                  icon={<DeleteOutlineOutlined fontSize="small" />}
                />
              </Tooltip>
            )}

            <Tooltip title="Add to favourites">
              <BottomNavigationAction
                sx={styleBottomNavigationAction}
                onClick={() => {
                  setSnackFav({ isOpen: true, isFav: isFavourite });
                  dispatch(handleFavouritePokemon(id, isFavourite));
                }}
                icon={
                  isFavourite ? (
                    <Favorite fontSize="small" />
                  ) : (
                    <FavoriteBorder fontSize="small" />
                  )
                }
              />
            </Tooltip>

            <Tooltip title="Learn about this pokemon">
              <BottomNavigationAction
                onClick={handleOpenDetailedPokemon}
                icon={<ReadMore />}
                sx={styleBottomNavigationAction}
              />
            </Tooltip>
          </BottomNavigation>
        )}
      </CardActions>
    </>
  );
};
