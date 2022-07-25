import { Rating, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import {
  dbCreateRating,
  dbGetAverageRating,
  dbUpdateRating,
} from "../../firebase/dbRatings";
import { selectAverageRating } from "../../lib/redux/slices/pokemonsSlice";
import { selectUserPokemonRating } from "../../lib/redux/slices/userSlice";
import { useAppSelector } from "../../utils/hooks";
import { TPokemon } from "../../utils/types";

const styleRatingContainerInCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // fontSize: "1rem",
  paddingRight: "10px",
  paddingLeft: "8px",
  width: "auto",
  margin: 0,
  "@media": { padding: 0 },
};

const styleAverageRatingParagraph = {
  fontWeight: "500",
  fontSize: "0.6rem",
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
  fontWeight: "700",
  fontSize: "0.9rem",
};

export const PokemonRating = ({
  id,
  inDetailed,
}: {
  id: TPokemon["id"];
  inDetailed?: boolean;
}) => {
  // const { id: pokemonId } = useContext(PokemonCardContext);
  const pokemonId = id;
  const userRating = useAppSelector((state) =>
    selectUserPokemonRating(state, pokemonId)
  );
  const averageRating = useAppSelector((state) =>
    selectAverageRating(state, pokemonId)
  );

  console.log("average userRating is: ", averageRating);
  console.log("user userRating is: ", userRating);

  const handleOnChange = async (rating: number) => {
    if (!userRating) {
      try {
        console.log("entering CREATION of a rating");
        await dbCreateRating({ pokemonId, rating });
        // TODO if no error can we assume it is OK and just update the store?
        await dbGetAverageRating({ pokemonId });
        return;
      } catch {
        throw new Error("An error occurred while adding rating.");
      }
    }

    try {
      console.log("entering UPDATE of a rating");
      await dbUpdateRating({ pokemonId, rating });
    } catch {
      throw new Error("An error occurred while adding rating.");
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
