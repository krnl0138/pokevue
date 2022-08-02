import { useTheme } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { ColorModeContext } from "../../../pages/_app";
import { HEADER_PAGES } from "../../../utils/constants";

type TLargeScreen = {
  handleCloseNavMenu: () => void;
};
export const LargeScreen = ({ handleCloseNavMenu }: TLargeScreen) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: {
          xs: "none",
          md: "flex",
          justifyContent: "flex-end",
          " button": { margin: "0 0.3rem" },
          " button:last-child": {
            marginLeft: "-0.3rem",
            marginRight: "0.3rem",
          },
        },
      }}
    >
      {HEADER_PAGES.map((page, i) => {
        const url = page.toLowerCase();
        return (
          <Button
            key={i}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              // marginRight: "1rem",
              color: "white",
              display: "block",
            }}
          >
            <Link href={`/${url}`}>
              <a>
                <Typography
                  component="p"
                  variant="body2"
                  sx={{
                    letterSpacing: "1.7px",
                    fontWeight: "300",
                  }}
                >
                  {page}
                </Typography>
              </a>
            </Link>
          </Button>
        );
      })}
      <Button
        onClick={colorMode.toggleColorMode}
        sx={{
          my: 2,
          color: "white",
          display: "block",
        }}
      >
        {theme.palette.mode === "dark" ? (
          <LightMode fontSize="small" sx={{ verticalAlign: "top" }} />
        ) : (
          <DarkMode fontSize="small" sx={{ verticalAlign: "top" }} />
        )}
      </Button>
    </Box>
  );
};
