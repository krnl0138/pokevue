import { Box, List, ListItem } from "@mui/material";
import Link from "next/link";
import { PROJECT_URLS as urls } from "../../../utils/constants";

export const Footer = () => {
  return (
    // <footer>
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "10rem",
      }}
    >
      <Box component="nav">
        <List sx={{ display: "flex" }}>
          <ListItem>
            <Link href={urls.home}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={urls.about}>About</Link>
          </ListItem>
          <ListItem>
            <Link href={urls.profile}>Profile</Link>
          </ListItem>
          <ListItem>
            <Link href={urls.favourites}>Favourites</Link>
          </ListItem>
        </List>
      </Box>
      <p>Made with MaterialUI, React/Redux, NextJS, Typescript and Firebase</p>
      <p>Pokevue, 2022</p>
    </Box>
    // </footer>
  );
};
