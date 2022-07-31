import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { ProfileForm } from "../components/forms/profileForm/ProfileForm";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { Layout } from "../components/utils/layout/Layout";
import { selectUser } from "../lib/redux/slices/userSlice";
import { AVATAR_PLACEHOLDER as placeholder } from "../utils/constants";
import { useAppSelector } from "../utils/hooks";

const styleHeadingContainer = {
  paddingTop: 6,
};

const styleHeadingTitle = {
  fontSize: "5rem",
  fontWeight: 700,
  letterSpacing: "0.05em",
};

const styleUserInfoContainer = {
  textAlign: "center",
  margin: 0,
  padding: 0,
  // width: "auto",
  img: { borderRadius: "50%" },
};

const styleUserInfoItem = {
  fontWeight: "300",
  fontSize: "1.5rem",
};

export const Profile = () => {
  const user = useAppSelector(selectUser);
  const { avatar, username, email } = user;
  return (
    <ProtectedRoute>
      <Layout>
        <Container sx={styleHeadingContainer}>
          <Typography component="h1" variant="h1" sx={styleHeadingTitle}>
            Your Profile
          </Typography>
        </Container>

        <Container
          sx={{ display: "flex", alignItems: "flex-start", marginTop: "2rem" }}
        >
          <ProfileForm />
          <Container sx={styleUserInfoContainer}>
            <Image
              src={avatar ? avatar : placeholder}
              alt={"User avatar"}
              width={250}
              height={250}
            />
            <Typography
              component="p"
              sx={{ ...styleUserInfoItem, marginTop: "1rem" }}
            >
              {username}
            </Typography>
            <Typography component="p" sx={styleUserInfoItem}>
              {email}
            </Typography>
          </Container>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
