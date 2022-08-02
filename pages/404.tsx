import { Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Layout } from "../components/utils/layout/Layout";
import Image from "next/image";
import { AVATAR_PLACEHOLDER } from "../utils/constants";

const styleMainContainer = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  textAlign: "center",
};
const styleTextError = { fontWeight: 700, marginBottom: "2.5rem" };

const Custom404 = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const styleText = md
    ? { ...styleTextError, fontSize: "3rem" }
    : lg
    ? { ...styleTextError, fontSize: "4rem" }
    : styleTextError;
  return (
    <Layout>
      <Container sx={styleMainContainer}>
        <Typography component="h1" variant="h1" sx={styleText}>
          You have founded 404 page not the pokemon. <br />
          Sorry, try again.
        </Typography>
        <Image
          src={AVATAR_PLACEHOLDER}
          alt="Pokemon icon"
          height="50rem"
          width="50rem"
        />
      </Container>
    </Layout>
  );
};
export default Custom404;
