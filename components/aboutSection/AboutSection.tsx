import { Container, Typography } from "@mui/material";
import Link from "next/link";

export const AboutSection = () => {
  return (
    <Container component="section">
      <Typography component="h1" variant="h1">
        Welcome to Pokevue
      </Typography>
      <Typography component="p">
        I built this website <s>just for fun</s> for my CV as a pet-project of
        mine. Feel free to see the source code on{" "}
        <Link href="https://github.com/">
          <a>Github</a>
        </Link>
        .
      </Typography>
      <br />
      <Typography component="p">
        Before this project I&apos;ve never watched Pokemon series. So I myself
        learned a lot of new :)
      </Typography>
      <br />
      <Typography component="p">
        For this project I&apos;ve used the following stack: MaterialUI +
        React/Redux + NextJS + Typescript + Firebase.
      </Typography>
    </Container>
  );
};
