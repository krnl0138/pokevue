import { OpenInNew } from "@mui/icons-material";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { styleGlobalHeadingSection } from "../../styles/styles";
import { AVATAR_PLACEHOLDER } from "../../utils/constants";
import { CarouselAbout } from "./aboutCarousel";

const styleMain = {
  marginTop: "2rem",
};

const styleHeadingEmphasized = {
  marginLeft: "1.5rem",
  marginRight: "1.5rem",
  fontWeight: 700,
  fontSize: "3rem",
};

const styleTextContainer = {
  padding: "4rem",
  marginTop: "4rem",
  " p": {
    marginBottom: "1rem",
    fontSize: "1.1rem",
    lineHeight: "1.8",
    fontWeight: "300",
  },
};

const styleSectionHeading = {
  fontSize: "1.2rem",
  marginBottom: "2rem",
  textTransform: "uppercase",
};

const styleText = {
  textAlign: "justify",
  " a": { color: "#00b4f8", textDecoration: "underline" },
};

export const AboutSection = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box component="section" sx={styleMain}>
      <Typography
        component="h1"
        variant="h1"
        sx={
          matches
            ? {
                ...styleGlobalHeadingSection,
                marginLeft: 0,
                textAlign: "center",
              }
            : styleGlobalHeadingSection
        }
      >
        Welcome to
        <Box component="span" sx={styleHeadingEmphasized}>
          Pokevue
        </Box>
        <Image
          src={AVATAR_PLACEHOLDER}
          alt="pokemon iconc"
          width="20px"
          height="20px"
        />
      </Typography>

      <CarouselAbout />

      <Container maxWidth="lg" sx={styleTextContainer}>
        <Typography component="h2" variant="h5" sx={styleSectionHeading}>
          About this project
        </Typography>
        <Typography component="p" sx={styleText}>
          Hi, my name is Ivan! I&apos;ve built this site as a pet-project of
          mine for my front-end portfolio. The source code is openly published
          at{" "}
          <Link href="https://github.com/">
            <a>
              Github page
              <OpenInNew fontSize="small" sx={{ fontSize: "0.8rem" }} />
            </a>
          </Link>
          .
          <br />
          I&apos;m actively looking for a job right now feel free to email me at{" "}
          <Link href="mailto:krnl03182@gmail.com">
            <a>
              krnl03182@gmail.com
              <OpenInNew fontSize="small" sx={{ fontSize: "0.8rem" }} />
            </a>
          </Link>
          .
          <br />
          <br />
          On Pokevue you can learn the information about pokemons, bookmark them
          and left comments about them. <br />
          You can optionally customize your profile and manage your data.
          <br />
          <br />
          My main focus is in front-end development, I also like to study
          back-end concepts and frameworks to be able to participate in the
          creation of complex systems and services. I understand business logic
          with its needs and I can relate to it.
          <br />
          <br />
          This site is built on top of Next JS framework with Firebase
          implementation as a main database and authentication provider. I do
          use Redux with SSR on some pages although I could use some caching
          solution, like `useSWR` from Vercel or other. Yet I&apos;ve thought it
          would be nice to connect the normalized store with SSR for the
          practice purposes. And should be handy for future scalability.
          <br />
          <br />
          The stack for this project is following: Typescript + Firebase +
          NextJS + React/Redux + MaterialUI.
          <br />
          <br />
          P.S. Before this project I&apos;ve never watched Pokemon series so I
          myself have learned a lot of new stuff.
        </Typography>
      </Container>
    </Box>
  );
};
