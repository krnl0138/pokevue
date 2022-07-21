import { Container } from "@mui/material";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Container>
          {children}
          <Footer />
        </Container>
      </main>
    </>
  );
};
