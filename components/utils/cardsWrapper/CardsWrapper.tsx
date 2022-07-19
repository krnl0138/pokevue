import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import Sortable from "sortablejs";
import { withDraggable } from "../hoc/withDraggable";

const CardsWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  // const dragRef = useRef<any>(null);
  // useEffect(() => {
  //   if (dragRef.current) {
  //     Sortable.create(dragRef.current, {
  //       animation: 220,
  //       easing: "cubic-bezier(ease)",
  //     });
  //   }
  // }, []);

  return (
    <Box
      // ref={dragRef}
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {children}
    </Box>
  );
};

export const CardsWrapperWithDraggable = withDraggable(CardsWrapper);
