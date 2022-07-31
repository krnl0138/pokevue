import { List } from "@mui/material";
import { useRef, useEffect } from "react";
import Sortable from "sortablejs";
import { PokemonCard } from "./pokemonCard/PokemonCard";
import autoAnimate from "@formkit/auto-animate";

const styleCardsList = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
};

type TPokemonCards = { ids: number[]; inRecent?: boolean };
export const PokemonCards = ({ ids, inRecent }: TPokemonCards) => {
  // `Sortable` and `AutoAnimate` implementation to allow dragging cards with animation
  const cardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!cardsRef.current) return;
    autoAnimate(cardsRef.current);
    Sortable.create(cardsRef.current, {
      animation: 220,
      easing: "cubic-bezier(ease)",
    });
  }, [cardsRef]);

  return (
    <List ref={cardsRef} component="div" sx={styleCardsList}>
      {ids.map((id) => (
        <PokemonCard key={id} id={id} inRecent={inRecent} />
      ))}
    </List>
  );
};
