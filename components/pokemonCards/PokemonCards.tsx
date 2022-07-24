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
  // `Sortable` implementation to allow dragging cards around
  const dragRef = useRef<any>(null);
  useEffect(() => {
    if (dragRef.current) {
      Sortable.create(dragRef.current, {
        animation: 220,
        easing: "cubic-bezier(ease)",
      });
    }
  }, [dragRef]);

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
