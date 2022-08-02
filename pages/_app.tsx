import "../styles/globals.css";
import { AppProps } from "next/app";
import store from "../lib/redux";
import { Provider } from "react-redux";
import Head from "next/head";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode, useMediaQuery } from "@mui/material";
import { useState, useMemo, createContext, useEffect } from "react";
import { getDesignTokens } from "../styles/palette";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  useEffect(() => {
    if (!prefersDarkMode) return;
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  /* It doesnn't like something about the default text color as `rgba()` color */
  const theme = useMemo(
    () => createTheme(getDesignTokens(mode) as any),
    [mode]
  );

  return (
    <>
      <Head>
        <title>Pokevue</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
