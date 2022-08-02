import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  Typography,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { HEADER_SETTINGS } from "../../../utils/constants";

type TSettings = {
  avatar: string;
  username: string;
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (e: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
};
export const Settings = ({
  avatar,
  username,
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}: TSettings) => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 0,
        }}
      >
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User avatar" src={avatar}>
              {username}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{
            mt: "45px",
            " ul": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
          }}
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
          {HEADER_SETTINGS.map((setting, i) => (
            <Link key={i} href={`/${setting.toLowerCase()}`}>
              <a>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ fontSize: "1rem", fontWeight: "300" }}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              </a>
            </Link>
          ))}
        </Menu>
      </Box>
    </>
  );
};
