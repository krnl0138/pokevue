import { Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { selectUser } from "../../lib/redux/slices/userSlice";
import { styleGlobalHeadingSection } from "../../styles/styles";
import { useAppSelector } from "../../utils/hooks";
import { ProfileForm } from "../forms/profileForm/ProfileForm";
import { UserInfo } from "./userInfo";

const styleHeadingContainer = {
  marginTop: "4rem",
};

const styleMainContainer = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  marginTop: "2rem",
  // justifyContent: "center", // from md->sm
  justifyContent: "space-between",
  alignContent: "center",
};

const styleHeading = {
  ...styleGlobalHeadingSection,
  fontWeight: 700,
};

export const ProfileSection = () => {
  const user = useAppSelector(selectUser);
  const { avatar, username, email } = user;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Container
        sx={
          matches
            ? { ...styleHeadingContainer, textAlign: "center" }
            : styleHeadingContainer
        }
      >
        <Typography
          component="h1"
          variant="h1"
          sx={
            matches ? { ...styleHeading, marginLeft: 0 } : { ...styleHeading }
          }
        >
          PROFILE
        </Typography>
      </Container>
      <Container
        sx={
          matches
            ? {
                ...styleMainContainer,
                flexDirection: "column",
                alignItems: "center",
              }
            : styleMainContainer
        }
      >
        {matches ? (
          <>
            <UserInfo avatar={avatar} username={username} email={email} />
            <ProfileForm />
          </>
        ) : (
          <>
            <ProfileForm />
            <UserInfo avatar={avatar} username={username} email={email} />
          </>
        )}
      </Container>
    </>
  );
};
