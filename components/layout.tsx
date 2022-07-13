import Head from "next/head";
import { Footer } from "./footer/Footer";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Pokemon</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div>
        <h1>Find your pokemons!</h1>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};
