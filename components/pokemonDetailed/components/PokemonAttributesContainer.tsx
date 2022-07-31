import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {
  styleGlobalBorderComponent,
  styleGlobalHoverShadow,
} from "../../../styles/styles";

const styleMainContainer = {
  paddingTop: 2,
  paddingBottom: 2,
  marginTop: 1,
  backgroundColor: "#fefefe",
  ...styleGlobalHoverShadow,
  ...styleGlobalBorderComponent,
};
const styleTitleContainer = {
  padding: 0,
  "@media": { padding: 0 },
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: 2,
};

const styleTitleHeading = {
  display: "flex",
  alignItems: "center",
  fontWeight: 700,
  marginRight: "5px",
};

type TPokemonAttributesContainer = {
  title: string;
  avatar: string;
  children: JSX.Element;
};

export const PokemonAttributesContainer = ({
  title,
  avatar,
  children,
}: TPokemonAttributesContainer) => {
  return (
    <Container sx={styleMainContainer}>
      <Container sx={styleTitleContainer}>
        <Typography variant="h3" component="h3" sx={styleTitleHeading}>
          {title}
        </Typography>
        <Image
          src={avatar}
          alt={"Pokemon small avatar"}
          width={65}
          height={65}
        />
      </Container>
      <Container>{children}</Container>
    </Container>
  );
};
