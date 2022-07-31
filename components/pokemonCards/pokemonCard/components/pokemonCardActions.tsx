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
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../utils/hooks";
import { URLS } from "../../../../utils/constants";
import {
  handleRecentPokemon,
  handleFavouritePokemon,
} from "../../../../lib/redux/slices/pokemonsSlice";
import { useContext } from "react";
import { PokemonCardContext } from "../pokemonCardContext";

export const PokemonCardActions = () => {
  const { id, isFavourite, isRecent, inRecent, isHovered } =
    useContext(PokemonCardContext);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenDetailedPokemon = () => {
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
          {inRecent && isRecent && (
            <Tooltip title="Delete from recent search">
              <BottomNavigationAction
                sx={{ color: "#1f88e5" }}
                onClick={() => dispatch(handleRecentPokemon(id, isRecent))}
                icon={<DeleteOutlineOutlined fontSize="small" />}
              />
            </Tooltip>
          )}

          <Tooltip title="Add to favourites">
            <BottomNavigationAction
              sx={{ color: "#1f88e5" }}
              onClick={() => dispatch(handleFavouritePokemon(id, isFavourite))}
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
              sx={{ color: "#1f88e5" }}
            />
          </Tooltip>
        </BottomNavigation>
      )}
    </CardActions>
  );
};
