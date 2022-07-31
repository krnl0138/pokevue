import { Box } from "@mui/material";
import { POKEMON_LOGO } from "../../../utils/constants";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";
import { ModalCardWrapper } from "../modal/ModalCardWrapper";

const styleLayoutMain = {
  background:
    "linear-gradient(211deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0.02) 100%)",
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
    top: "15%",
    right: "5%",
    height: "200px",
    width: "500px",
    backgroundImage: `url(${POKEMON_LOGO})`,
    backgroundSize: "500px 200px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    filter: "opacity(.3)",
    transform: "rotate(10deg)",
    zIndex: "-1",
  },
};

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Header />
      <Box component="main" sx={styleLayoutMain}>
        <Box component="div" sx={styleLayoutWrapper}>
          {children}
        </Box>
        <ModalCardWrapper />
        <Footer />
      </Box>
    </>
  );
};
