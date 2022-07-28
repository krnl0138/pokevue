import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  ListItem,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { RootState } from "../../lib/redux";
import {
  getOtherUser,
  selectOtherUser,
  selectUserAvatar,
} from "../../lib/redux/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { TPokemon, TUser } from "../../utils/types";
import { AVATAR_PLACEHOLDER as placeholder } from "../../utils/constants";
import { selectCurrentUserUid } from "../../lib/redux/slices/userSlice";
import { RemoveCircleOutline } from "@mui/icons-material";
import {
  styleGlobalBorderComponent,
  styleGlobalHoverShadow,
} from "../../styles/styles";
import { dbInterface } from "../../lib/api/dbInterface";
import { useEffect, useRef } from "react";

type TCommentItem = {
  uid: TUser["uid"];
  comment: string;
  commentId: string;
  pokemonId: number;
};
export const CommentItem = ({
  uid,
  comment,
  pokemonId,
  commentId,
}: TCommentItem) => {
  const db = dbInterface();
  const dispatch = useAppDispatch();
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    if (!uid) return;
    dispatch(getOtherUser(uid));
    executedRef.current = true;
  }, []);

  const currentUserUid = useAppSelector(selectCurrentUserUid);
  const user = useAppSelector((state: RootState) =>
    selectOtherUser(state, uid)
  );
  const handleOnClick = async () =>
    await db.deleteComment(pokemonId, commentId);

  return (
    <ListItem
      component="div"
      sx={{
        margin: "4px 0",
        ...styleGlobalBorderComponent,
        ...styleGlobalHoverShadow,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1,
          minWidth: "70px",
          maxWidth: "70px",
          textAlign: "center",
        }}
      >
        {user ? (
          <>
            {user.avatar ? (
              <Avatar>
                <Image
                  width="50"
                  height="50"
                  src={user.avatar ? user.avatar : placeholder}
                  alt="User avatar"
                />
              </Avatar>
            ) : (
              <CircularProgress />
            )}

            <Typography
              component="p"
              variant="body2"
              sx={{ fontSize: "0.675rem" }}
            >
              {user.username}
            </Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>

      <Typography
        component="p"
        variant="body1"
        sx={{ fontWeight: "300", fontSize: "0.9rem", padding: "8px 0" }}
      >
        {comment}
      </Typography>

      {uid === currentUserUid && (
        <FormControl sx={{ marginLeft: "auto" }}>
          <Button type="submit" variant="text" onClick={handleOnClick}>
            <RemoveCircleOutline fontSize="small" />
          </Button>
        </FormControl>
      )}
    </ListItem>
  );
};
