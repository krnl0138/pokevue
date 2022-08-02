import { Rating, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { dbInterface } from "../../lib/api/dbInterface";
import { selectAverageRating } from "../../lib/redux/slices/pokemonsSlice";
import {
  selectCurrentUserUid,
  selectUserPokemonRating,
} from "../../lib/redux/slices/userSlice";
import { useAppSelector } from "../../utils/hooks";
import { TPokemon } from "../../utils/types";

const styleRatingContainerInCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flexGrow: "1",
  paddingRight: "10px",
  paddingLeft: "8px",
  width: "auto",
  margin: 0,
  "@media": { padding: 0 },
};

const styleAverageRatingParagraph = {
  fontWeight: "300",
  fontSize: "0.6rem",
  lineHeight: "1.4",
  letterSpacing: "0.03em",
};

const styleRatingContainerInDetailed = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  paddingRight: "16px",
  width: "auto",
  margin: 0,
  "@media": { padding: 0 },
};

const styleAverageRatingParagraphInDetailed = {
  fontWeight: "400",
  fontSize: "0.85rem",
  letterSpacing: "0.01rem",
};

type TPokemonRating = { id: TPokemon["id"]; inDetailed?: boolean };
export const PokemonRating = ({ id, inDetailed }: TPokemonRating) => {
  const db = dbInterface();
  const userRating = useAppSelector((state) =>
    selectUserPokemonRating(state, id)
  );
  const averageRating = useAppSelector((state) =>
    selectAverageRating(state, id)
  );
  const uid = useAppSelector(selectCurrentUserUid);

  const handleOnChange = async (rating: number) => {
    if (!userRating) {
      try {
        // TODO if no error can we assume it is OK and just update the store?
        await db.createRating(uid, { id, rating });
        db.getAverageRating(id);
        return;
      } catch {
        throw new Error("An error occurred while adding rating.");
      }
    }

    try {
      await db.updateRating(uid, { id, rating });
    } catch {
      throw new Error("An error occurred while updating rating.");
    }
  };

  return (
    <Container
      sx={
        inDetailed ? styleRatingContainerInDetailed : styleRatingContainerInCard
      }
    >
      <Tooltip title={"Your Pokemon Rating"} placement="top" arrow={true}>
        <Rating
          size={inDetailed ? "large" : "medium"}
          value={userRating ? userRating : 0}
          onChange={async (event, rating) => {
            if (!rating) return;
            handleOnChange(rating);
          }}
        />
      </Tooltip>
      <Tooltip
        title="Rating by other users"
        placement={inDetailed ? "top" : "bottom"}
      >
        <Typography
          component="p"
          variant="body2"
          sx={
            inDetailed
              ? styleAverageRatingParagraphInDetailed
              : styleAverageRatingParagraph
          }
        >
          Average Rating: {averageRating ? averageRating : 0}
        </Typography>
      </Tooltip>
    </Container>
  );
};
