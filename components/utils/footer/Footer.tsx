import { Box, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import { URLS } from "../../../utils/constants";

const styleFooterMain = {
  width: "100%",
  height: "7rem",
  marginTop: "3rem",
  marginBottom: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  " p": {
    fontWeight: "300",
    letterSpacing: "0.1rem",
    textTransform: "uppercase",
  },
  "#footer-title": {
    fontWeight: 700,
  },
};

export const Footer = () => {
  return (
    <Box component="footer" sx={styleFooterMain}>
      <Box component="nav" sx={{ marginBottom: 1 }}>
        <List sx={{ display: "flex" }}>
          <ListItem>
            <Typography component="p" variant="body1">
              <Link href={URLS.home}>
                <a>Home</a>
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p" variant="body1">
              <Link href={URLS.about}>
                <a>About</a>
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p" variant="body1">
              <Link href={URLS.profile}>
                <a>Profile</a>
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography component="p" variant="body1">
              <Link href={URLS.favourites}>
                <a>Favourites</a>
              </Link>
            </Typography>
          </ListItem>
        </List>
      </Box>
      <Typography id="footer-title" component="p" variant="h6">
        Pokevue, 2022
      </Typography>
    </Box>
  );
};
