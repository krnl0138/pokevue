import { Avatar } from "@mui/material";
import Image from "next/image";
import { AVATAR_PLACEHOLDER as placeholder } from "../../../../../utils/constants";

export const PokemonCardHeaderAvatar = ({ avatar }: { avatar: string }) => {
  return (
    <Avatar
      sx={{
        bgcolor: "transparent",
        img: { minWidth: "40px" },
      }}
    >
      <Image
        src={avatar ? avatar : placeholder}
        width="30"
        height="30"
        alt="avatar pokemon"
      />
    </Avatar>
  );
};
