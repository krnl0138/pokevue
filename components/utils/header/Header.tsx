import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import { AVATAR_PLACEHOLDER } from "../../../utils/constants";

import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { selectUser } from "../../../lib/redux/slices/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { CornerLogo } from "./CornerLogo";
import { LargeScreen } from "./LargeScreen";
import { Settings } from "./Settings";
import { SmallScreen } from "./SmallScreen";

const Header = () => {
  const { username, avatar } = useAppSelector(selectUser);
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="static"
      sx={
        theme.palette.mode === "light"
          ? { backgroundColor: "rgb(24 125 226 / 95%)" }
          : { backgroundColor: "rgb(8 8 8 / 75%)" }
      }
    >
      <Box
        component="div"
        sx={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <Container maxWidth="xl" sx={{}}>
          <Toolbar disableGutters>
            <CornerLogo />
            <SmallScreen
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              handleOpenNavMenu={handleOpenNavMenu}
            />
            <LargeScreen handleCloseNavMenu={handleCloseNavMenu} />
            <Settings
              anchorElUser={anchorElUser}
              avatar={avatar ? avatar : AVATAR_PLACEHOLDER}
              handleCloseUserMenu={handleCloseUserMenu}
              handleOpenUserMenu={handleOpenUserMenu}
              username={username}
            />
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
};
export default Header;
