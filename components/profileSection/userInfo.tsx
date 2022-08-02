import { Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { AVATAR_PLACEHOLDER } from "../../utils/constants";

const styleUserInfoContainer = {
  textAlign: "center",
  margin: 0,
  padding: 0,
  width: "auto",
  img: { borderRadius: "50%" },
};

const styleUserInfoItem = {
  fontWeight: "300",
  fontSize: "1.5rem",
};

type TUserInfo = {
  avatar?: string;
  username: string;
  email: string;
};
export const UserInfo = ({ avatar, username, email }: TUserInfo) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Container sx={styleUserInfoContainer}>
      {matches ? (
        <Image
          src={avatar ? avatar : AVATAR_PLACEHOLDER}
          alt={"User avatar"}
          width={150}
          height={150}
        />
      ) : (
        <Image
          src={avatar ? avatar : AVATAR_PLACEHOLDER}
          alt={"User avatar"}
          width={250}
          height={250}
        />
      )}
      <Typography
        component="p"
        sx={{ ...styleUserInfoItem, marginTop: "1rem" }}
      >
        {username}
      </Typography>
      <Typography component="p" sx={{ ...styleUserInfoItem, fontSize: "1rem" }}>
        {email}
      </Typography>
    </Container>
  );
};
