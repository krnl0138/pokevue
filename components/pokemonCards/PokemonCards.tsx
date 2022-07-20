import { PokemonCard } from "../pokemonCard/PokemonCard";
import { CardsWrapper } from "../utils/cardsWrapper/CardsWrapper";

export const PokemonCards = ({ ids }: { ids: number[] }) => {
  return (
    <CardsWrapper>
      {ids.map((id) => (
        <PokemonCard key={id} id={id} />
      ))}
    </CardsWrapper>
  );
};
