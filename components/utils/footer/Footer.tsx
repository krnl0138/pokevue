import { Box, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import { URLS } from "../../../utils/constants";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "7rem",
        p: { fontWeight: 700 },
      }}
    >
      <Box component="nav" sx={{ marginBottom: 1 }}>
        <List sx={{ display: "flex" }}>
          <ListItem>
            <Link href={URLS.home}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={URLS.about}>About</Link>
          </ListItem>
          <ListItem>
            <Link href={URLS.profile}>Profile</Link>
          </ListItem>
          <ListItem>
            <Link href={URLS.favourites}>Favourites</Link>
          </ListItem>
        </List>
      </Box>
      <Typography component="p" variant="h6" sx={{ fontWeight: 700 }}>
        Pokevue, 2022
      </Typography>
    </Box>
  );
};
