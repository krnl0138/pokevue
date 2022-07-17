import { Box } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../utils/heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

export const RecentSearch = ({ children }: { children?: JSX.Element }) => {
  const allPokemons = useAppSelector((state) => state.pokemons);
  const recentPokemons = allPokemons.filter((el) => el.isRecent === true);

  const boxRef = useRef(null);
  useEffect(() => {
    Sortable.create(boxRef.current, {
      animation: 220,
      easing: "cubic-bezier(ease)",
    });
  }, []);

  return (
    <>
      <Heading title={"Recent search"} />
      {/* // TODO abstract ? */}
      <Box id="box" sx={{ display: "flex" }} ref={boxRef}>
        {recentPokemons.map((data) => (
          <PokemonCard key={data.id} data={data} fromRecent={true} />
        ))}
      </Box>
    </>
  );
};
