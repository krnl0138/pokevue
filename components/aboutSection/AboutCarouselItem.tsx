import { Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { TCarouselItem } from "../../utils/types";

export const CarouselItem = ({ item }: { item: TCarouselItem }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));
  const styleItemDimensions = sm
    ? { maxWidth: "16rem", minHeight: "14rem" }
    : md
    ? { maxWidth: "22rem", minHeight: "25rem" }
    : xl
    ? { maxWidth: "50rem", minHeight: "35rem" }
    : { maxWidth: "70rem", minHeight: "70rem" };

  const styleItemHeading = sm
    ? { fontSize: "0.5rem" }
    : md
    ? { fontSize: "1rem" }
    : { fontSize: "1.5rem" };
  return (
    <Container sx={{ ...styleItemDimensions }}>
      <Image
        src={item.image}
        alt={item.name}
        layout="fill"
        width="100%"
        height="100%"
      />

      <Typography component="h2" sx={styleItemHeading}>
        {item.description}
      </Typography>
    </Container>
  );
};
