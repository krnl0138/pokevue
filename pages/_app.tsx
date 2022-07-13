import "../styles/globals.css";
import { AppProps } from "../node_modules/next/app";
import store from "../lib/redux";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
