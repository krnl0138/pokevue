import Head from "next/head";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Pokevue</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <main>
        <h1>Find your pokemons!</h1>
        {children}
        <Footer />
      </main>
    </>
  );
};
