import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import Sortable from "sortablejs";
import { Pokemon } from "../../utils/types";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { Heading } from "../utils/heading/Heading";

export const AllPokemons = ({
  pokemons,
  children,
}: {
  pokemons: Pokemon[];
  children?: JSX.Element;
}) => {
  const boxRef = useRef<null | HTMLElement>(null);
  useEffect(() => {
    if (boxRef.current) {
      Sortable.create(boxRef.current, {
        animation: 220,
        easing: "cubic-bezier(ease)",
      });
    }
  }, []);

  return (
    <>
      <Heading title={"All pokemons"} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
        ref={boxRef}
      >
        {pokemons.map((data) => (
          <PokemonCard key={data.id} data={data} />
        ))}
      </Box>
    </>
  );
};
