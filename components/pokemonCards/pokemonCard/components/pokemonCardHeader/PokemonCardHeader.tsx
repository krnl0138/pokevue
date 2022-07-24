import CardHeader from "@mui/material/CardHeader";
import { PokemonCardHeaderAction } from "./PokemonCardHeaderAction";
import { PokemonCardHeaderAvatar } from "./PokemonCardHeaderAvatar";
import { PokemonCardHeaderTitle } from "./PokemonCardHeaderTitle";

export const PokemonCardHeader = () => {
  return (
    <CardHeader
      avatar={<PokemonCardHeaderAvatar />}
      action={<PokemonCardHeaderAction />}
      title={<PokemonCardHeaderTitle />}
    />
  );
};
