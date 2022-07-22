import { TPokemon } from "../../utils/types";
import { getPokemon } from "./getPokemon";

//   console.log("From fetchEvolution: search is: ", search);
//   console.log("From fetchEvolution: evoName is: ", evoName);
//   console.log(result);
export async function fetchEvolution(search: number | string) {
  const result: TPokemon[] = [];
  const recursive = async (search: number | string) => {
    //   console.log("From fetchEvolution: search is: ", search);
    const pokemon = await getPokemon(search);
    result.push(pokemon);
    //   console.log("result array is: ", result);
    const evoName = pokemon.pokemonData.evolutionName;
    //   console.log("From fetchEvolution: evoName is: ", evoName);
    if (evoName !== null && evoName !== undefined) {
      await recursive(evoName);
      // result.push(pokemon);
    } else {
      return;
    }
  };
  await recursive(search);
  console.log(result);
  return result;
}
