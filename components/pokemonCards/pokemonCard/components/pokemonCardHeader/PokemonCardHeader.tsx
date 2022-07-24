import CardHeader from "@mui/material/CardHeader";
import { TPokemon } from "../../../../../utils/types";
import { PokemonCardHeaderAction } from "./PokemonCardHeaderAction";
import { PokemonCardHeaderAvatar } from "./PokemonCardHeaderAvatar";
import { PokemonCardHeaderTitle } from "./PokemonCardHeaderTitle";

export type TMyCardHeader = Pick<TPokemon, "id"> &
  Pick<
    TPokemon["pokemonData"],
    | "name"
    | "avatarSmall"
    | "isLegendary"
    | "isMythical"
    | "captureRate"
    | "isBaby"
  >;

export const PokemonCardHeader = ({
  isLegendary,
  isMythical,
  isBaby,
  captureRate,
  avatarSmall,
  name,
  id,
}: TMyCardHeader) => {
  return (
    <CardHeader
      avatar={<PokemonCardHeaderAvatar avatar={avatarSmall} />}
      action={<PokemonCardHeaderAction id={id} />}
      title={
        <PokemonCardHeaderTitle
          name={name}
          isLegendary={isLegendary}
          isMythical={isMythical}
          captureRate={captureRate}
          isBaby={isBaby}
        />
      }
    />
  );
};
