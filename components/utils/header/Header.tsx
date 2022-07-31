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
  APP_NAME,
} from "../../../utils/constants";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "../../../utils/hooks";
import { selectUser } from "../../../lib/redux/slices/userSlice";
import { authInterface } from "../../../firebase/authInterface";

const pages = ["Pokemons", "About"];
const settings = ["Favourites", "Profile", "Logout"];

const Header = () => {
  const auth = authInterface();
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

  const { username, avatar } = useAppSelector(selectUser);

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(24 125 226 / 95%)" }}>
      <Container
        maxWidth="xl"
        sx={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <Toolbar disableGutters>
          <Link href={URLS.home}>
            <a>
              <Image
                src={PROJECT_LOGO}
                width="40"
                height="40"
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
              fontWeight: 300,
              letterSpacing: ".25rem",
              fontSize: "1.1rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            <Link href={URLS.home}>{APP_NAME}</Link>
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
                    sx={{ letterSpacing: "1.8" }}
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
              fontWeight: 300,
              fontSize: "1.1rem",
              letterSpacing: ".25rem",
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
                    marginRight: "1rem",
                    color: "white",
                    display: "block",
                  }}
                >
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      letterSpacing: "1.7px",
                      fontWeight: "300",
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
              <Typography
                sx={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  marginBottom: "0.5rem",
                }}
              >
                {username}
              </Typography>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "logout" ? auth.logout : handleCloseUserMenu
                  }
                >
                  <Typography
                    textAlign="center"
                    sx={{ fontSize: "1rem", fontWeight: "300" }}
                  >
                    <Link href={`${setting.toLowerCase()}`}>
                      <a>{setting}</a>
                    </Link>
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
