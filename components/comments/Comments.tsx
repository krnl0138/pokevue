import { CircularProgress, List, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { RootState } from "../../lib/redux";
import { selectPokemonComments } from "../../lib/redux/slices/pokemonsSlice";
import { getOtherUser } from "../../lib/redux/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TPokemon } from "../../utils/types";
import { CommentItem } from "./CommentItem";

type TComments = {
  pokemonId: TPokemon["id"];
};

export const Comments = ({ pokemonId }: TComments) => {
  const dispatch = useAppDispatch();
  // pokemonComments = [ {commentId, uid, comment}, {commentId, uid, comment} ]
  const pokemonComments = useAppSelector((state: RootState) =>
    selectPokemonComments(state, pokemonId)
  );
  console.log("pokemonComments in Comments is: ", pokemonComments);
  console.log("pokemonComments lenght is: ", pokemonComments.length);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography component="h2" variant="h2" sx={{ marginBottom: 3 }}>
        Comments
      </Typography>

      {pokemonComments.length > 0 ? (
        <List sx={{ maxWidth: "480px", minWidth: "480px", width: "480px" }}>
          {pokemonComments.map((commentBody) => {
            if (!commentBody) return;
            return (
              <CommentItem
                key={commentBody.commentId}
                pokemonId={pokemonId}
                comment={commentBody.comment}
                uid={commentBody.uid}
                commentId={commentBody.commentId}
              />
            );
          })}
        </List>
      ) : (
        <Typography component="p" variant="caption">
          No comments were added yet.
        </Typography>
      )}
    </Container>
  );
};
