import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { SPACEBURGER_PUBLIC_SCREENSHOTS } from "../../utils/constants";
import { CarouselItem } from "./AboutCarouselItem";

export const CarouselAbout = () => {
  const items = SPACEBURGER_PUBLIC_SCREENSHOTS;
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const styleCarousel = lg
    ? { margin: "0", backgroundColor: "orange" }
    : { margin: "0 10%" };
  return (
    <Carousel sx={styleCarousel}>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};
