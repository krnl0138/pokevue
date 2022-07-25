import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import {
  URLS,
  PROJECT_LOGO,
  AVATAR_PLACEHOLDER as placeholder,
} from "../../../utils/constants";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "../../../utils/hooks";
import { handleLogout } from "../../../firebase/auth";
import { userSelect } from "../../../lib/redux/slices/userSlice";

const pages = ["Pokemons", "About"];
const settings = ["Favourites", "Profile", "Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { username, avatar } = useAppSelector(userSelect);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={URLS.home}>
            <a>
              <Image
                src={PROJECT_LOGO}
                width="50"
                height="50"
                alt="Project Logo"
              />
            </a>
          </Link>
          <Typography
            variant="h5"
            noWrap
            sx={{
              ml: 2,
              display: { xs: "none", md: "flex", alignItems: "center" },
              fontWeight: 400,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={URLS.home}>Pokevue</Link>
          </Typography>

          {/* large screen */}
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component="p"
                    variant="body2"
                    textAlign="center"
                    sx={{ letterSpacing: "1.8", paddingRight: 1 }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* // image in the middle when small screen */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href={URLS.home}>
              <a>
                <Image
                  src={PROJECT_LOGO}
                  width="50"
                  height="50"
                  alt="Project Logo"
                />
              </a>
            </Link>
          </Typography>
          {/* large screen */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {pages.map((page) => {
              const url = page.toLowerCase();
              return (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      paddingRight: 1,
                      letterSpacing: "1.7px",
                    }}
                  >
                    <Link href={`/${url}`}>{page}</Link>
                  </Typography>
                </Button>
              );
            })}
          </Box>

          {/* settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User avatar" src={avatar ? avatar : placeholder} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography textAlign="center">{username}</Typography>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "logout" ? handleLogout : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">
                    <Link href={`${setting.toLowerCase()}`}>{setting}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
