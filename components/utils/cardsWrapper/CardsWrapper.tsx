import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import Sortable from "sortablejs";

export const CardsWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  // ? can be HOC but it's complicated with forwardRef
  const dragRef = useRef<any>(null);
  useEffect(() => {
    if (dragRef.current) {
      Sortable.create(dragRef.current, {
        animation: 220,
        easing: "cubic-bezier(ease)",
      });
    }
  }, []);

  return (
    <Box
      ref={dragRef}
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
