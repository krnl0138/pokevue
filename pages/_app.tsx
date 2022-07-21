import "../styles/globals.css";
import { AppProps } from "next/app";
import store from "../lib/redux";
import { Provider } from "react-redux";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // was main
    <>
      <Head>
        <title>Pokevue</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
