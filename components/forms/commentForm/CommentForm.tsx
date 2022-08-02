import React, { useReducer } from "react";
import { InputComponent } from "../../utils/forms/InputComponent";
import { SubmitButtonComponent } from "../../utils/forms/SubmitButtonComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { commentReducer, initialStateComment } from "./commentFormReducer";
import { writeComment } from "../../../lib/redux/slices/userSlice";
import { TMyChangeFormEvent } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

// TODO make it persisten with redux Slice
export const CommentForm = ({ pokemonId }: { pokemonId: number }) => {
  const dispatch = useAppDispatch();
  const [state, dispatchComment] = useReducer(
    commentReducer,
    initialStateComment
  );
  const { isLoading, error, comment } = state;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (comment === "") return;
    dispatchComment({ type: "publish" });
    try {
      dispatch(writeComment(pokemonId, comment));
    } catch (err) {
      dispatchComment({ type: "failed", value: error });
      throw new Error(`${err}`);
    }
    dispatchComment({ type: "success" });
  };

  const onChangeComment = (e: TMyChangeFormEvent) => {
    dispatchComment({
      type: "field",
      field: "comment",
      value: e.currentTarget.value,
    });
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
    >
      <InputComponent
        label="Enter your comment"
        onChange={onChangeComment}
        value={comment}
        size="small"
        customSX={{ marginRight: "1rem", minWidth: "20rem" }}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <SubmitButtonComponent text="Publish" />
      )}
    </Container>
  );
};
