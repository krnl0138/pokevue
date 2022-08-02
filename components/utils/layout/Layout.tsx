import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BACKGROUND_IMAGE } from "../../../utils/constants";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";
import { ModalCardWrapper } from "../modal/ModalCardWrapper";

const styleBackgroundGradient = {
  background:
    "linear-gradient(211deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0.02) 100%)",
};

const styleLayoutMain = {
  height: "92vh",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
};

const styleLayoutWrapper = {
  flexGrow: 1,
  position: "relative",
  "::before": {
    content: "''",
    position: "fixed",
    top: "55%",
    right: 0,
    height: "30rem",
    width: "40rem",
    backgroundImage: `url(${BACKGROUND_IMAGE})`,
    backgroundSize: "40rem 25rem",
    backgroundRepeat: "no-repeat",
    filter: "opacity(.1)",
    zIndex: "-1",
  },
};

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const styleMain =
    theme.palette.mode === "light"
      ? { ...styleLayoutMain, ...styleBackgroundGradient }
      : styleLayoutMain;

  const styleWrapper =
    theme.palette.mode === "light"
      ? {
          ...styleLayoutWrapper,
          "::before": {
            ...styleLayoutWrapper["::before"],
            filter: "opacity(.3)",
          },
        }
      : styleLayoutWrapper;
  return (
    <>
      <Header />
      <Box component="main" sx={styleMain}>
        <Box
          component="div"
          sx={
            matches
              ? {
                  ...styleWrapper,
                }
              : styleWrapper
          }
        >
          {children}
        </Box>
        <ModalCardWrapper />
        <Footer />
      </Box>
    </>
  );
};
