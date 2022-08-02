import { List, Snackbar, Stack, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  useRef,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Sortable from "sortablejs";
import { PokemonCard } from "./pokemonCard/PokemonCard";
import autoAnimate from "@formkit/auto-animate";
import { NUM_POKEMONS_TO_LOAD_MORE } from "../../utils/constants";
import {
  styleGlobalBorderComponent,
  styleGlobalContainerDark,
} from "../../styles/styles";

const styleCardsList = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};

/*
 * SnackContext is used to display small hint messages at the corner on action.
 */
type TSnackCardsContext<T> = {
  snackFav: T;
  setSnackFav: Dispatch<SetStateAction<T>>;
};
export const SnackCardsContext = createContext(
  {} as TSnackCardsContext<{ isOpen: boolean; isFav: boolean }>
);

type TPokemonCards = { ids: number[]; inRecent?: boolean; loading?: boolean };
export const PokemonCards = ({ ids, inRecent, loading }: TPokemonCards) => {
  const [snackFav, setSnackFav] = useState({ isOpen: false, isFav: false });

  /*
   * Add dragging and animation with `Sortable` and `AutoAnimate`
   */
  const cardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!cardsRef.current) return;
    autoAnimate(cardsRef.current);
    Sortable.create(cardsRef.current, {
      animation: 220,
      easing: "cubic-bezier(ease)",
    });
  }, [cardsRef]);

  /*
   * Pre-render skeleton logic
   */
  const theme = useTheme();
  const styleSkeleton =
    theme.palette.mode === "dark"
      ? { ...styleGlobalContainerDark }
      : { ...styleGlobalBorderComponent };
  const skeletonArray = Array(NUM_POKEMONS_TO_LOAD_MORE).fill(0);
  const skeletons = skeletonArray.map((i, index) => (
    <Stack key={index} spacing={1}>
      <Skeleton
        sx={{ ...styleSkeleton, borderRadius: "50%" }}
        variant="circular"
        width={50}
        height={50}
      />
      <Skeleton
        sx={styleSkeleton}
        variant="rectangular"
        width={385}
        height={500}
      />
    </Stack>
  ));

  return (
    <SnackCardsContext.Provider value={{ snackFav, setSnackFav }}>
      <List
        id="pokemonCards-list"
        ref={cardsRef}
        component="div"
        sx={styleCardsList}
      >
        {ids.map((id) => (
          <PokemonCard key={id} id={id} inRecent={inRecent} />
        ))}
        {loading && <>{skeletons}</>}
      </List>

      <Snackbar
        open={snackFav.isOpen}
        autoHideDuration={2000}
        onClose={() =>
          setSnackFav((prev) => {
            return { ...prev, isOpen: false };
          })
        }
        message={
          snackFav.isFav ? "Removed from favourites" : "Added to favourites"
        }
      />
    </SnackCardsContext.Provider>
  );
};
