import React, { useReducer } from "react";
import { InputComponent } from "../InputComponent";
import { SubmitButtonComponent } from "../SubmitButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography } from "@mui/material";
import { useAppDispatch } from "../../../utils/hooks";
import { commentReducer, initialStateComment } from "./commentFormReducer";
import { writeComment } from "../../../lib/redux/slices/userSlice";

// TODO make it persisten with redux Slice
export const CommentForm = ({ pokemonId }: { pokemonId: number }) => {
  const dispatch = useAppDispatch();
  const [state, dispatchComment] = useReducer(
    commentReducer,
    initialStateComment
  );
  const { isPublished, isLoading, error, comment } = state;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchComment({ type: "publish" });
    // await addComment(pokemonId, comment);
    try {
      console.log("I was called");
      await writeComment(pokemonId, comment);
      dispatchComment({ type: "success" });
    } catch (errorC) {
      dispatchComment({ type: "failed", value: error });
      throw new Error(`${errorC}`);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputComponent
          label="Enter your comment"
          id="comment"
          onChange={(e) =>
            dispatchComment({
              type: "field",
              field: "comment",
              value: e.currentTarget.value,
            })
          }
          value={comment}
        />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <SubmitButtonComponent title="Publish" />
        )}
      </form>

      {isPublished && (
        <Typography component="p" variant="body1">
          Successfully publish a comment.
        </Typography>
      )}
      {error && (
        <Typography component="p" variant="body1">
          There was an error: {error}
        </Typography>
      )}
    </Container>
  );
};
