import Head from "next/head";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Pokemon</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <main>{children}</main>
    </div>
  );
};
