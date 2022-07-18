import { Box } from "@mui/material";
import { Heading } from "../utils/heading/Heading";

export const AboutSection = () => {
  return (
    <Box component="section">
      <Heading title={"Welcome to Pokevue"} />
      <p>
        I built this website <s>just for fun</s> for my CV as a pet-project of
        mine. Feel free to use the source code on{" "}
        <a href="https://github.com/">Github</a>.
      </p>
      <br />
      <p>
        Before this project I&apos;ve never watched Pokemon series. So I myself
        learned a lot of new :)
      </p>
      <br />
      <p>
        For this project I&apos;ve used the following stack: MaterialUI +
        React/Redux + NextJS + Typescript + Firebase.
      </p>
    </Box>
  );
};
