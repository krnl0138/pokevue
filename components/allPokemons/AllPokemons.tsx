import { NUM_RANDOM_POKEMON_CADRS } from "../../utils/constants";
import { Pokemon } from "../../utils/types";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { CardsWrapper } from "../utils/cardsWrapper/CardsWrapper";
import { Heading } from "../utils/heading/Heading";

export const AllPokemons = ({
  pokemons,
  children,
}: {
  pokemons: Pokemon[];
  children?: JSX.Element;
}) => {
  return (
    <>
      <Heading
        title={`${NUM_RANDOM_POKEMON_CADRS} random pokemons are served!`}
      />
      <CardsWrapper>
        {pokemons.map((data) => (
          <PokemonCard key={data.id} data={data} />
        ))}
      </CardsWrapper>
    </>
  );
};
