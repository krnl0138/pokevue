import { useTheme } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { ColorModeContext } from "../../../pages/_app";
import { HEADER_PAGES, URLS } from "../../../utils/constants";
import MenuIcon from "@mui/icons-material/Menu";

type TSmallScreen = {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (e: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
};
export const SmallScreen = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}: TSmallScreen) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {HEADER_PAGES.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Link href={`${page.toLowerCase()}`}>
                <a>
                  <Typography
                    component="p"
                    variant="body2"
                    textAlign="center"
                    sx={{ letterSpacing: "1.8" }}
                  >
                    {page}
                  </Typography>
                </a>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 300,
          justifyContent: "center",
          fontSize: "1.1rem",
          letterSpacing: ".25rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <Link href={URLS.home}>
          <a>Pokevue</a>
        </Link>
      </Typography>
      <Button
        onClick={colorMode.toggleColorMode}
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          justifyContent: "flex-end",
          fontWeight: 300,
          fontSize: "1.1rem",
          letterSpacing: ".25rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {theme.palette.mode === "dark" ? (
          <LightMode fontSize="small" sx={{ verticalAlign: "top" }} />
        ) : (
          <DarkMode fontSize="small" sx={{ verticalAlign: "top" }} />
        )}
      </Button>
    </>
  );
};
