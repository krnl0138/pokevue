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
import { useAppDispatch } from "../../../../utils/hooks";
import { URLS } from "../../../../utils/constants";
import {
  handleRecentPokemon,
  handleFavouritePokemon,
} from "../../../../lib/redux/slices/pokemonsSlice";
import { useContext } from "react";
import { PokemonCardContext } from "../pokemonCardContext";

export const PokemonCardActions = ({
  isHovered,
  inRecent,
}: {
  isHovered: boolean;
  inRecent: boolean;
}) => {
  const { id, isFavourite, isRecent } = useContext(PokemonCardContext);
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
                onClick={() => dispatch(handleRecentPokemon(id, isRecent))}
                icon={<DeleteOutlineOutlined fontSize="small" />}
                sx={{ color: "#1f88e5" }}
              />
            </Tooltip>
          )}

          <Tooltip title="Add to favourites">
            <BottomNavigationAction
              onClick={() => dispatch(handleFavouritePokemon(id, isFavourite))}
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
              onClick={handleOpenDetailedPokemon}
              icon={<Segment fontSize="small" />}
              sx={{ color: "#1f88e5" }}
            />
          </Tooltip>
        </BottomNavigation>
      )}
    </CardActions>
  );
};
