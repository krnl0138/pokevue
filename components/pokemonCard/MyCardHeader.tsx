import { MoreVert } from "@mui/icons-material";
import { CardHeader, Avatar, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import Image from "next/image";
import { AVATAR_PLACEHOLDER as placeholder } from "../../utils/constants";

export const MyCardHeader = ({ avatar }: { avatar: string }) => {
  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: blue[600] }} aria-label="recipe">
          <Image
            src={avatar ? avatar : placeholder}
            width="30"
            height="30"
            alt="avatar pokemon"
          />
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVert />
        </IconButton>
      }
      // subheader="September 14, 2016"
    />
  );
};
