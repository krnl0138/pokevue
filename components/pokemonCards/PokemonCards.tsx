import { List } from "@mui/material";
import { useRef, useEffect } from "react";
import Sortable from "sortablejs";
import { PokemonCard } from "./pokemonCard/PokemonCard";

export const PokemonCards = ({
  ids,
  inRecent,
}: {
  ids: number[];
  inRecent?: boolean;
}) => {
  const dragRef = useRef<any>(null);

  useEffect(() => {
    if (dragRef.current) {
      Sortable.create(dragRef.current, {
        animation: 220,
        easing: "cubic-bezier(ease)",
      });
    }
  }, [dragRef]);

  console.log("inRecent from PokemonCards: ", inRecent);
  return (
    <List
      ref={dragRef}
      component="div"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {ids.map((id) => (
        <PokemonCard key={id} id={id} inRecent={inRecent} />
      ))}
    </List>
  );
};
