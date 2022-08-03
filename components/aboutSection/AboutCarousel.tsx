import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { TCarouselItem } from "../../utils/types";
import { CarouselItem } from "./AboutCarouselItem";

export const AboutCarousel = ({ items }: { items: TCarouselItem[] }) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const styleCarousel = md ? { margin: "0" } : { margin: "0 10%" };
  return (
    <Carousel sx={styleCarousel}>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};
