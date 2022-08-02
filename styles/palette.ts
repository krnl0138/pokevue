import { PaletteMode } from "@mui/material";
import { grey, green } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          /* Light mode */
          text: {},
        }
      : {
          /* Dark mode */
          divider: green,
          background: {
            default: "rgb(20 31 55)",
          },
          text: {
            primary: "rgb(255 255 255 / 90%)",
            secondary: grey[500],
          },
        }),
  },
});
