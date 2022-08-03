import {
  Container,
  Typography,
  ImageList,
  ImageListItem,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { POKEVUE_PUBLIC_SCREENSHOTS } from "../../utils/constants";

export const PokevueMobile = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ margin: "2rem 0" }}>
      <Typography component="h3" variant="h6" sx={{ fontWeight: 300 }}>
        Ipad view
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <ImageList
          sx={md ? { width: 1000, height: 410 } : { width: 1000, height: 410 }}
          cols={md ? 2 : 3}
          rowHeight={md ? 204 : 404}
          gap={25}
        >
          {POKEVUE_PUBLIC_SCREENSHOTS.slice(2).map((item) => (
            <ImageListItem key={item.image}>
              <Image
                src={`${item.image}`}
                alt={item.name}
                loading="lazy"
                layout="fill"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <Typography component="h3" variant="h6" sx={{ fontWeight: 300 }}>
        Iphone view
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <ImageList
          sx={sm ? { width: 550, height: 304 } : { width: 550, height: 544 }}
          cols={2}
          rowHeight={sm ? 304 : 544}
          gap={25}
        >
          {POKEVUE_PUBLIC_SCREENSHOTS.slice(0, 2).map((item) => (
            <ImageListItem key={item.image}>
              <Image
                src={`${item.image}`}
                alt={item.name}
                loading="lazy"
                layout="fill"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Box>
  );
};
