import { Avatar } from "@mui/material";
import Image from "next/image";
import { useContext } from "react";
import { AVATAR_PLACEHOLDER as placeholder } from "../../../../../utils/constants";
import { PokemonCardContext } from "../../pokemonCardContext";

export const PokemonCardHeaderAvatar = () => {
  const { pokemonData } = useContext(PokemonCardContext);
  const { avatarSmall } = pokemonData;
  return (
    <Avatar
      sx={{
        bgcolor: "transparent",
        img: { minWidth: "40px" },
      }}
    >
      <Image
        src={avatarSmall ? avatarSmall : placeholder}
        width="30"
        height="30"
        alt="avatar pokemon"
      />
    </Avatar>
  );
};
