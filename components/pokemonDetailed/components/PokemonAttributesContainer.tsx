import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {
  styleGlobalBorderComponent,
  styleGlobalHoverShadow,
} from "../../../styles/styles";
export const PokemonAttributesContainer = ({
  title,
  avatar,
  children,
}: {
  title: string;
  avatar: string;
  children: JSX.Element;
}) => {
  return (
    <Container
      sx={{
        paddingTop: 2,
        paddingBottom: 2,
        marginTop: 1,
        ...styleGlobalHoverShadow,
        ...styleGlobalBorderComponent,
      }}
    >
      <Container
        sx={{
          padding: 0,
          "@media": { padding: 0 },
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            marginRight: "5px",
          }}
        >
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
