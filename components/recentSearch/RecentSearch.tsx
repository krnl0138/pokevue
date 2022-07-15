import { Box } from "@mui/material";
import { useAppSelector } from "../../utils/hooks";
import { Heading } from "../utils/heading/Heading";
import { PokemonCard } from "../pokemonCard/PokemonCard";

export const RecentSearch = ({ children }: { children?: JSX.Element }) => {
  /*
    1. [ ]- create an array of current search results in the global state
        a. [ ]- array length <=  3 (improvement: should be based on the display dimensions)
        b. [ ]- each array element is an object with `data` property
            - [ ]- with `pokemon` and `pokemonSpecies` values stored inside the `data` property
        c. [ ]- if a new element is added in the array after the third one: remove the last and place it first
    2. [ ]- pass the state with the array of current search results
    3. [ ]- on each element of the array populate the PokemonCard component with the data
    4. [ ]- make this component draggable (potentially dracula lib)
    5. [ ]- add Header component
    */

  const allPokemons = useAppSelector((state) => state.pokemons);
  const recentPokemons = allPokemons.filter((el) => el.isRecent === true);

  return (
    <>
      <Heading title={"Recent search"} />
      <Box>
        {recentPokemons.map((data) => (
          <PokemonCard key={data.id} data={data} fromRecent={true} />
        ))}
      </Box>
    </>
  );
};
